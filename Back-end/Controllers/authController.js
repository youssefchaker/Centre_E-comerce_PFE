const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

const crypto = require('crypto');
const cloudinary = require('cloudinary');
const Product = require('../models/Product');

// Register a user   => /register

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { firstname,lastname, email, password } = req.body;
    const exuser= await User.find({email:email})
        if (exuser===[])
            return next(new ErrorHandler('this email already exists', 400));
        else{
            const user =User.create({
                firstname,
                lastname,
                email,
                password
            })
            res.status(201).json({
                success: true,
                message:"user added!"
            })
            sendToken(user, 200, res);

        }
})

// Login User  =>  /login

exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }else{
         // Finding user in database

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    else{
         // Checks if password is correct or not

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    else{
        res.status(201).json({
            message:"welcome again to our website"
        })
        sendToken(user, 200, res)
    }
    }
    }
})

// Forgot Password   =>  /forgotpass

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }
    else{
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`
    try {
        await sendEmail({
            email: user.email,
            subject: 'ShopIT Password Recovery',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
    }
})
// Reset Password   =>  /password/reset/:token

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)

})

// Logout user   =>   /logout

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

// Get currently logged in user details   =>   /myprofile

exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    //gets current loged in user
    const user = await User.find({_id:req.user._id});
    res.status(200).json({
        success: true,
        user
    })
})

// Update user profile   =>   /update

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message:"your profile has been updated!"
    })
}) 

//the admin Gets all users   =>   /admin/users

exports.allUsers = catchAsyncErrors(async (req, res, next) => {

    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})

//the admin Gets user details   =>   /admin/users/:id

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with the email: ${req.params.id}`))
    }
    else{
        res.status(200).json({
            success: true,
            user
        })
    }    
})

//the admin Deletes user   =>   /admin/users/:id

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user=await User.findByIdAndRemove(req.params.id)
        if (!user) {
            return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
        }
        else{
            res.status(200).json({
                success: true,
                message: 'user is deleted.'
            })
        }
})

// the client creates new review   =>   /store/product/addreview/:id

exports.createProductReview = catchAsyncErrors(async (request, res, next) => {

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

// the client updates a specific review   =>   /store/product/updatereview/:id

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

// the client deletes a specific product review   =>   /store/product/deletereview/:id

exports.deleteProductReview = catchAsyncErrors(async (request, res, next) => {
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