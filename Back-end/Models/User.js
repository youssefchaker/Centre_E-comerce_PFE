const bcrypt = require('bcryptjs');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema=new Schema({
    firstname:{
        type:String,
        required:[true, 'Please enter your first name']
    },
    lastname:{
        type:String,
        required:[true, 'Please enter your last name']
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
        minlength: [8, 'Your password must be longer than 8 characters']
    },
    role:{
        type:String,
        default:"User",
        enum:['User','Admin','store']
    },
    register_date:{
        type:Date,
        default:Date.now
    },
    resetpasswordtoken:String,
    resetpasswordexpire:Date
});

// Encrypting password before saving user
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password

UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Return JWT token

UserSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

// Generate password reset token

UserSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken

}

module.exports=mongoose.models.User || mongoose.model('User',UserSchema);