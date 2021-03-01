const Product = require('../models/Product')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')

// Create new product   =>   /store/products/addproduct

exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})


// Get all products   =>   api/mall/admin/products


exports.getStoreProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

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

// Get all products (Admin)  =>   /api/mall/admin/products

exports.getallProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })

})

// Get single product details   =>   /api/mall/product/:id

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.find({name:req.params.id});

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

// Get searched product details   =>   /api/mall/product/:id

exports.getSearchedProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.find({name: req.params.id});

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


// Get new products details   =>   /api/mall/products/newproducts

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

// Update Product   =>   /api/mall/store/products/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    product = await Product.findOneAndUpdate({name:req.params.id},{new:true}, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

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

// Delete Product   =>   /api/mall/store/product/:id

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findOneAndRemove({name:req.params.id});

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
// Create new review   =>   /api/store/product/addreview

exports.createProductReview = catchAsyncErrors(async (request, res, next) => {
    
    const newReview= request.body;
    const product = await Product.findOne({name:request.params.id});
    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }
    else{
        product.reviews.push(newReview);
        product.nbreviews=product.nbreviews+1; 
        res.status(200).json({
            success: true,
            message:"review added"}) 
        }
})


// Get all Products Reviews   =>   /api/mall/reviews

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const tabreviews=[];
    (await Product.find()).forEach(function(product){
        console.log(product);
        tabreviews.push({product:product.reviews})
    })
    res.status(200).json({
        success: true,
        reviews: tabreviews
    })
})

// Delete Product Review   =>   /api/mall/reviews/:id
exports.deleteReview = catchAsyncErrors(async (request, res, next) => {

    const product = await Product.find({name:request.params.id});
    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }
    else{
    const revname=request.body;
    console.log(revname)

    product.reviews.filter(review=>review.name!==revname)

    res.status(200).json({
        success: true,
        message:"review deleted"
    })
    }  
})