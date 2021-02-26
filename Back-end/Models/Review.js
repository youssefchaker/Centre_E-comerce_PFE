const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const validator = require('validator');
//create schema

const ReviewSchema=new Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    reviewnb:{
        type:Number,
        required:[true, 'Please enter your review'],
        default:3
    },
    reviewdesc:{
        type:String,
        required:[true,'please fill in your description for the review']
    }
});

module.exports=mongoose.model('Review',ReviewSchema);