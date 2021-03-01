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
    /*
    Store: {
        type: mongoose.Schema.ObjectId,
        ref: 'Store'
    },*/
    store: {
        type: String,
        required:[true,"please enter a store"]
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
        required:[true,'please specify the number of products added']
    },
    creationdate:{
        type:Date,
        default:Date.now(),
    },
    images: [
        {
            public_id: {
                type: String,
                required: [true,'please specify the image public_id']
            },
            url: {
                type: String,
                required: [true,'please specify the image url']
            },
        }
    ],
    category:{
        type:String,
        required:[true,'please specify the desired category'],
        enum: [
                "Electronics",
                "Cameras",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
                "Books",
                "Clothes",
                "Beauty",
                "Sports",
                "Outdoor",
                "Home"
            ]
    },
    reviews: [
        {
            /* 
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            */
            user: {
                type: String,
                required: [true,'please specify the review user']
            },
            rating: {
                type: Number,
                required: [true,'please specify the review rating']
            },
            comment: {
                type: String,
                required: [true,'please specify the review comment']
            }
        }
    ],
    details:[
        {
            detailname:{
                type:String,
                required:[true,'please enter the detail name']
            },

            value:{
                type:String,
                required:[true,'please enter the detail value']
            }
        }
]
});
module.exports = mongoose.model('Product', productSchema);