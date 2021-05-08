const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

const crypto = require('crypto');

// Register a user   => api/mall/register

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { firstname,lastname, email, password } = req.body;

    const exuser= await User.find({email:email})
        if (exuser===[]) {
            return next(new ErrorHandler('this email already exists', 400));
        }


        else {
            const user = await User.create({
                firstname,
                lastname,
                email,
                password
            })

            sendToken(user, 200, res)


        }
})


// Login User  =>  /api/mall/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // 
    if (!user.active) {
        return next(new ErrorHandler('Your account is deactivated', 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    sendToken(user, 200, res)


})

// Logout user   =>   api/mall/logout
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

// Forgot Password   =>  /api/mall/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {

        await sendEmail({
            email: user.email,
            subject: 'Mall Password Recovery',
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

})

// Reset Password   =>  /api/mall/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

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

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)

})


// Get currently logged in user details   =>   api/mall/myprofile

exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
}) 

// Update / Change password   =>  /api/mall/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect',400));
    }
    user.password = req.body.password;
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
})
                                                            
// Update user profile   =>   api/mall/myprofile/update

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message:"your profile has been updated!"
    })
}) 

//the admin Gets all users   =>   api/mall/admin/users

exports.allUsers = catchAsyncErrors(async (req, res, next) => {

    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})

//the admin Gets user details   =>   /admin/user/:id

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

// Admin Update user profile   =>   /api/mall/admin/user/:id
exports.AdminUpdateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})


//the admin Deletes user   =>   /admin/user/:id

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findByIdAndRemove(req.params.id)
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



//User contact formulaire   =>   api/mall/contact
exports.contactFormulaire = catchAsyncErrors(async (req, res, next) => {
    const {email, message, messagetopic} = req.body;

    const user = await User.findOne({ email });

    try {

        await sendEmail({
            email: 'trabelsi.mouhib3@gmail.com',
            subject: messagetopic,
            message
        })

        res.status(200).json({
            success: true,
            message: `message sent `
        })

    } catch (error) {
       
        return next(new ErrorHandler(error.message, 500))
    }

})

// Admin reactivate or deactivate user account
exports.activateAccount = catchAsyncErrors(async (req, res, next) => {
    
    const {id,active}=req.body;
    
   const user = await User.findByIdAndUpdate(id, {active: active}, {
       new: true,
       runValidators: true,
       useFindAndModify: false
   })
   if (user && active )
   res.status(200).json({
       success: true,
       message:"user account has been activated !",
       user
   })

   if (user && !active )
   res.status(200).json({
       success: true,
       message:"user account has been deactivated !",
       user
   })
}) 