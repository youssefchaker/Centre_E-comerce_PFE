
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const validator = require('validator');
//create schema

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
        minlength: [6, 'Your password must be longer than 6 characters']
    },
    role:{
        type:String,
        default:"User",
        enum:['User','Admin']
    },
    register_date:{
        type:Date,
        default:Date.now
    },
    resetpasswordtoken:{
        type:String,
        default:''
    },
    resetpasswordexpire:{
        type:Boolean,
        default:false
    }
});

module.exports=mongoose.model('User',UserSchema);