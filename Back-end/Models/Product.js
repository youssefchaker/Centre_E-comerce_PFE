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
            image_id: {
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
            'Electronics',
            'Cameras',
            'Laptops',
            'Accessories',
            'Phones&Tablets',
            'Food',
            "Books",
            'Fashion',
            'Beauty&Health',
            'Sports',
            'Outdoor',
            'Home'
            ]
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