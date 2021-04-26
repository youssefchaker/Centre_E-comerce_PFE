
const Store=require("../models/store");
const Product = require('../models/product');
const User=require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary')

// Create new product   =>   /api/mall/store/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
     
    const { name , description , storename , price , stock , category , details, discount } = req.body;
    let images=req.body.images
    Product.find({name:name}).exec(function(err,product){
            Store.findOne({name:storename}).populate('store').exec(async function(err,store){
                let imageLinks=[];
                for(var i=0;i<images.length;i++){
                    const result = await cloudinary.v2.uploader.upload(images[i],{
                        folder:'products'
                    });
                    imageLinks.push({
                        public_id:result.public_id,
                        url:result.secure_url
                    })
                }
                images=imageLinks;
                Product.create({
                    name,
                    description,
                    store,
                    price,
                    stock,
                    images,
                    category,
                    details,
                    discount
                });
                res.status(201).json({
                    success: true,
                    message:"product has been added"
                })
            })
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
    const storenames=[];
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;
    for(var i=0;i<products.length;i++){
        const store= await Store.findById(products[i].store);
        storenames.push(store.name);
    }
    res.status(200).json({
        success: true,
        productsCount,
        filteredProductsCount,
        products,
        storenames
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
    const product=await Product.findById(req.params.id)
if (!product) {
    return next(new ErrorHandler('Product not found', 404));
}
else{
    const store=await Store.findById(product.store);
    res.status(200).json({
        success: true,
        product,
        storename:store.name
    })
}
})

// Get top products details   =>   /api/mall/products/top

exports.getTopProducts = catchAsyncErrors(async (req, res, next) => {
    const products=await Product.find().sort({nbreviews:-1}).limit(5);
    let storenames=[];
    for(var i=0;i<products.length;i++){
        const store= await Store.findById(products[i].store);
        storenames.push(store.name);
    }
        res.status(200).json({
            success: true,
            products,
            storenames
        })

})


// Get new products details   =>   /api/mall/products/new

exports.getNewProducts = catchAsyncErrors(async (req, res, next) => {
    let storenames=[];
    const products=await Product.find().sort({creationdate:-1}).limit(5);
    for(var i=0;i<products.length;i++){
        const store= await Store.findById(products[i].store);
        storenames.push(store.name);
    }
        res.status(200).json({
            success: true,
            products,
            storenames
        })

})

// Get searched product details   =>   /products/search

exports.getSearchedProduct = catchAsyncErrors(async (req, res, next) => {
    const storenames=[];
    const apiFeatures = new APIFeatures(Product.find(), req.params.keyword)
        .search()
    let products = await apiFeatures.query;
    if (products.length===0) {
        return next(new ErrorHandler('Product not found', 404));
    }
    else{
        for(var i=0;i<products.length;i++){
            const store= await Store.findById(products[i].store);
            storenames.push(store.name);
        }
        res.status(200).json({
            success: true,
            products,
            storenames
        })
    }
        })

// store and admin Update Product   =>   /api/mall/store/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    if(req.body.images!=undefined){
        let product = await Product.findById(req.params.id);
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        let imageLinks=[];
                for(var i=0;i<req.body.images.length;i++){
                    const result = await cloudinary.v2.uploader.upload(req.body.images[i],{
                        folder:'products'
                    });
                    imageLinks.push({
                        public_id:result.public_id,
                        url:result.secure_url
                    })
                }
                req.body.images=imageLinks;
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});
    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }
    else{
        res.status(200).json({
            success: true,
            "message":"product updated"
        })
    }

})


// store Updates Product Detail   =>   /api/mall/store/productdetail/:id
exports.updateProductDetails = catchAsyncErrors(async (req, res, next) => {
    const {detailname,value}=req.body;
    const product =await Product.findOneAndUpdate({"details._id":req.params.id},{$set:{"details.$[var].detailname":detailname,'details.$[var].value':value}},{"arrayFilters": [
        { "var._id": req.params.id }]})
            if(!product){
                return next(new ErrorHandler('Product or Review not found', 404));
            }
    else{
        res.status(200).json({
            success: true,
            "message":"product updated"
        })
    }

})

// store and admin Delete Product   =>   /api/mall/store/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product is deleted.'
    })

})

// Create new review   =>   /api/mall/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const {userid,rating,comment}=req.body
    User.findById(userid).populate("user").exec(function(err,user){
        Product.findByIdAndUpdate(req.params.id,{ $push: { reviews:{user:user,rating:rating,comment:comment} },$inc: {nbreviews:1} },{useFindAndModify:false}).exec(function(err,product){
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
    const usernames=[];
    const product = await Product.findById(req.params.id);
    for(var i=0;i<product.reviews.length;i++){
        const user= await User.findById(product.reviews[i].user);
        usernames.push({"firstname":user.firstname,"lastname":user.lastname});
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
        usernames
    })
})

// Delete Product Review   =>   /api/mall/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

        const product1=await Product.findByIdAndUpdate(req.params.productid,{$pull: {reviews:{_id:req.params.reviewid},$inc: {nbreviews:-1}}})
         product1.save();    
         const product2=await Product.findByIdAndUpdate(req.params.productid,{$inc: {nbreviews:-1}});
         product2.save();   
        res.status(200).json({
            success: true,
            message:"review deleted"}) 
    
})

// Delete Product Review   =>   /admin/reviews/:id
exports.deleteAdminReview = catchAsyncErrors(async (req, res, next) => {

    const product=await Product.findByIdAndUpdate(req.params.productid,{$pull: {reviews:{_id:req.params.reviewid},$inc: {nbreviews:-1}}})
         product.save();    
        product.Update({$inc: {nbreviews:-1}});
         product.save();   
        res.status(200).json({
            success: true,
            message:"review deleted"}) 
})

// the client updates a specific review   =>   /product/updatereview/:id

exports.updateProductReview = catchAsyncErrors(async (req, res, next) => {
    const {rating,comment}=req.body;
    const product =await Product.findOneAndUpdate({"reviews._id":req.params.id},{$set:{"reviews.$[var].comment":comment,'reviews.$[var].rating':rating}},{"arrayFilters": [
        { "var._id": req.params.id }]})
            if(!product){
                return next(new ErrorHandler('Product or Review not found', 404));
            }

            else{
                product.save();
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