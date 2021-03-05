const Product = require('../models/Product');
const User=require('../models/User');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Store=require("../Models/Store");
const APIFeatures=require("../utils/apiFeatures");

// Create new product   =>   /store/products/addproduct

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

// Get all products =>   /products            /admin/product

exports.getallProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;
    if(filteredProductsCount===0)
        return next(new ErrorHandler("there is no products for this filter", 404));
    apiFeatures.pagination(resPerPage)
    products = await apiFeatures.query;


    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
    })

})

// Get a single product from a specific store   =>   /store/product/:id

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

// Get top products details   =>   /api/mall/products/topproducts

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


// Get new products details   =>   /products/newproducts

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

// Update Product   =>   /store/product/update/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

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

// Delete Product   =>   /store/product/delete/:id

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    
    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    else{
        product.remove();
        res.status(200).json({
            success: true,
            message: 'Product is deleted.'
        })
    }
})

// Get a Product Reviews   =>   /admin/product/reviews/:id

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product=await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('the product does not exist', 404));
    }
    else{
        if(product.reviews.length===0)
            return next(new ErrorHandler('this product does not have any reviews', 404));
        res.status(200).json({
            success: true,
            reviews: product.reviews
        })
    }
})


// Get all Products Reviews   =>   /admin/products/reviews

exports.getallProductReviews = catchAsyncErrors(async (req, res, next) => {
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