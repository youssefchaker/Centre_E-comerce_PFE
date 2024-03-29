const mongoose = require('mongoose')
const Schema=mongoose.Schema;
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name']
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    store: {
        type: mongoose.Schema.ObjectId,
        ref: 'Store'
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price']
    },
    stock:{
        type:Number,
        required:[true,'please specify the number of products added']
    },
    nbreviews:{
        type:Number,
        default:0
    },
    creationdate:{
        type:Date,
        default:Date.now(),
    },
    images: [
        {
            public_id: {
                type: String
            },
            url: {
                type: String
            },
        }
    ],
    category:{
        type:String,
        required:[true,'please specify the desired category']
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            },
            rating: {
                type: Number
            },
            comment: {
                type: String
            }
        }
    ],
    details:[
        {
            detailname:{
                type:String
                
            },

            value:{
                type:String
                
            }
        }
],
discount:{
    type:Number
},
});
module.exports = mongoose.model('Product', productSchema);