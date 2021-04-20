
const Store=require("../models/store");
const Product = require('../models/product');
const User=require('../models/user');



const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
//const cloudinary = require('cloudinary')

// Create new product   =>   /api/mall/store/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
     
    const store = await Store.findOne({name: req.body.store}).populate('store')

        if(!store) {
            return next(new ErrorHandler(`the store  ${store.name} does not exist`, 404)); 
        }
        console.log(store.user);
        if(store.user != req.user.id) {
            return next(new ErrorHandler(`you are not allowed to add product, this is for the store's user`, 404)); 
            
        }
   /* let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    */
    //req.body.images = imagesLinks
    req.body.user = req.user.id;
    const user = req.body.user;
    const { name , description , price , stock, images , category , details, reviews } = req.body;

    const product = await Product.create({
        name,
        description,
        store,
        price,
        stock,
        images,
        category,
        details,
        reviews,
        user
    });

    res.status(201).json({
        success: true,
        product
    })
})

// Get all products for a specific store   =>   api/mall/store/products/:id
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

// Get a single product from a specific store   =>   api/mall/product/:id

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
    const [product1,product2,product3,product4,product5,product6,product7,product8]=await Product.find().sort({nbreviews:-1}).limit(8);
    if (!product1 ||!product2 ||!product3 ||!product4 ||!product5||!product6||!product7||!product8) {
        return next(new ErrorHandler('1 or more Products not found', 404));
    }
    else{
        res.status(200).json({
            success: true,
            product1,
            product2,
            product3,
            product4,
            product5,
            product6,
            product7,
            product8
        })
    }
})


// Get new products details   =>   /api/mall/products/new

exports.getNewProducts = catchAsyncErrors(async (req, res, next) => {
    const [product1,product2,product3,product4,product5,product6,product7,product8]=await Product.find().sort({creationDate:-1}).limit(8);
    if (!product1 ||!product2 ||!product3 ||!product4 ||!product5||!product6||!product7||!product8) {
        return next(new ErrorHandler('1 or more Products not found', 404));
    }
    else{
        res.status(200).json({
            success: true,
            product1,
            product2,
            product3,
            product4,
            product5,
            product6,
            product7,
            product8
        })
    }
})

// store and admin Update Product   =>   /api/mall/store/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
   /*
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the product
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

    }

   */

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })

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

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
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

    const product = await Product.findById(req.query.productId);

    console.log(product);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "review deleted"
    })
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