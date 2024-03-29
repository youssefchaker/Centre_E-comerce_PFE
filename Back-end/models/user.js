const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

//create schema
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true, 'Please enter your first name'],
        maxlength: [30, 'Your name cannot exceed 30 characters']

    },
    lastname:{
        type:String,
        required:[true, 'Please enter your last name'],
        maxlength: [30, 'Your name cannot exceed 30 characters']

    },
    email:{
        type:String,
        required:[true, 'Please enter your email'],
        unique:true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password:{
        type:String,
        required:[true, 'Please enter your password'],
        minlength: [8, 'Your password must be longer than 8 characters'],
        select: false

    },
    role:{
        type:String,
        default:"User",
        enum:['User','Admin','Seller']
    },
    active:{
        type: Boolean,
        default: true
    },
    register_date:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
});

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Return JWT token

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

// Generate password reset token

userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken

}

module.exports = mongoose.model('User', userSchema);
