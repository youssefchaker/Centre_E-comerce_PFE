const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')

// Create new review   =>   /api/mall/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { reviewnb, reviewdesc, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        reviewnb:reviewnb,
        reviewdesc
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.reviewdesc = reviewdesc;
                review.reviewnb = reviewnb;
            }
        })

    } else {
        product.reviews.push(review);
        product.nbReviews = product.reviews.length
    }

    product.reviews.nbReviews = product.reviews.reduce((acc, item) => item.nbReviews + acc, 0) / product.nbReviews

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})


// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    console.log(product);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = product.nbReviews;

    const ratings = product.reviews.reduce((acc, item) => item.reviewnb + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        nbReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})