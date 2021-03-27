
const Store=require("../models/store");
const Product = require('../models/product');
const User=require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
//const cloudinary = require('cloudinary')

// Create new product   =>   /api/mall/store/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
     
    const { name , description , storename , price , stock, images , category , details } = req.body;
    Product.find({name:name}).exec(function(err,product){
        if(!product)
            return next(new ErrorHandler(`the product ${product.name} already exists`, 404));
        else{
            Store.findOne({name:storename}).populate('store').exec(function(err,store){
                if(!store)
                    return next(new ErrorHandler(`the store with the name ${storename} does not exist`, 404));    
                Product.create({
                    name,
                    description,
                    store,
                    price,
                    stock,
                    images,
                    category,
                    details
                });
                res.status(201).json({
                    success: true,
                    message:"product has been added"
                })
            })
        }
    })
})

// Get all products for a specific store   =>   /store/products/:id


exports.getStoreProducts = catchAsyncErrors(async (req, res, next) => {
    Store.findById(req.params.id).exec(function(err,store){
        Product.find({store:store}).exec(function(err,products){
            if (products.length==0) {
                return next(new ErrorHandler(`there are no products in ${store.name}`, 404));
            }
            else{
                res.status(200).json({
                    success: true,
                    products
                })
            }
        });
    })
})


// Get all products   =>   /api/mall/products?keyword=laptop
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    


    res.status(200).json({
        success: true,
        productsCount,
        filteredProductsCount,
        products
    })

})

// Admin Get all products   =>   /api/mall/admin/products
exports.adminGetProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })

})

// Get a single product from a specific store   =>   /product/:id

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    await Product.findById(req.params.id).exec(function(err,product){
        if (!product) {
    return next(new ErrorHandler('Product not found', 404));
}
else{
    res.status(200).json({
        success: true,
        product
    })
}
})
})

// Get top products details   =>   /api/mall/products/top

exports.getTopProducts = catchAsyncErrors(async (req, res, next) => {
    const [product1,product2,product3,product4,product5]=await Product.find().sort({nbreviews:-1}).limit(5);
    if (!product1 ||!product2 ||!product3 ||!product4 ||!product5) {
        return next(new ErrorHandler('1 or more Products not found', 404));
    }
    else{
        res.status(200).json({
            success: true,
            product1,
            product2,
            product3,
            product4,
            product5
        })
    }
})


// Get new products details   =>   /api/mall/products/new

exports.getNewProducts = catchAsyncErrors(async (req, res, next) => {
    const [product1,product2,product3,product4,product5]=await Product.find().sort({creationdate:-1}).limit(5);
    if (!product1 ||!product2 ||!product3 ||!product4 ||!product5) {
        return next(new ErrorHandler('1 or more Products not found', 404));
    }
    else{
        res.status(200).json({
            success: true,
            product1,
            product2,
            product3,
            product4,
            product5
        })
    }
})

// Get searched product details   =>   /products/search

exports.getSearchedProduct = catchAsyncErrors(async (req, res, next) => {

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
    let products = await apiFeatures.query;
    if (products.length===0) {
        return next(new ErrorHandler('Product not found', 404));
    }
    else{
        res.status(200).json({
            success: true,
            products
        })
    }
        })

// store and admin Update Product   =>   /api/mall/store/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    console.log(req.params.id);
    console.log(req.body);
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});
    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }
    else{
        res.status(200).json({
            success: true,
            product
        })
    }

})

// store and admin Delete Product   =>   /api/mall/store/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    // Deleting images associated with the product
    //for (let i = 0; i < product.images.length; i++) {
        //const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    //}

    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product is deleted.'
    })

})

// Create new review   =>   /api/mall/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const {rating,comment}=req.body
    //get current loged in user
    User.findById(req.user._id).populate("user").exec(function(err,user){
        Product.findByIdAndUpdate(request.params.id,{ $push: { reviews:{user:user,rating:rating,comment:comment} },$inc: {nbreviews:1} },{useFindAndModify:false}).exec(function(err,product){
            if(!product){
                return next(new ErrorHandler('Product not found', 404));
            }
            else{
                res.status(200).json({
                    success: true,
                    message:"review added"}) 
                }
        });
    })
})

// Get Product Reviews   =>   /api/mall/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if(product.reviews.length===0) {
      return next(new ErrorHandler('this product does not have any reviews', 404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Product Review   =>   /api/mall/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

    const product =Product.findOneAndUpdate({"reviews._id":req.params.id},{$pull:{reviews:{_id:req.params.id}}})
            if(!product){
                return next(new ErrorHandler('Product or Review not found', 404));
            }
            else{
                res.status(200).json({
                    success: true,
                    message:"review deleted"}) 
                }
})

// Delete Product Review   =>   /admin/reviews/:id
exports.deleteAdminReview = catchAsyncErrors(async (req, res, next) => {

    const product =Product.findOneAndUpdate({"reviews._id":req.params.id},{$pull:{reviews:{_id:req.params.id}}})
            if(!product){
                return next(new ErrorHandler('Product or Review not found', 404));
            }
            else{
                res.status(200).json({
                    success: true,
                    message:"review deleted"}) 
                }
})

// the client updates a specific review   =>   /product/updatereview/:id

exports.updateProductReview = catchAsyncErrors(async (request, res, next) => {

    const {rating,comment}=req.body;
    const product =Product.findOneAndUpdate({"reviews._id":req.params.id},{"reviews":{$elemMatch:{_id:req.params.id}},$set:{rating:rating,comment:comment}})
            if(!product){
                return next(new ErrorHandler('Product or Review not found', 404));
            }
            else{
                res.status(200).json({
                    success: true,
                    message:"review added"}) 
                }
})

// admin Get all Products Reviews   =>   api/mall/admin/reviews

exports.getAllProductReviews = catchAsyncErrors(async (req, res, next) => {
    const tabreviews=[];
    (await Product.find()).forEach(function(product){
        tabreviews.push({productname:product.name,productreviews:product.reviews})
    })
    if (tabreviews.length==0) {
        return next(new ErrorHandler('there are no reviews in the website at the moment', 404));
    }
    else{
        res.status(200).json({
            success: true,
            reviews: tabreviews
        })
    }
})

// Get store name from the id

exports.getStorename = catchAsyncErrors(async (req, res, next) => {
    Store.findById(req.params.id).exec(function(err,store){
        res.status(200).json({
            success:true,
            storename:store.name
        })
    })
})