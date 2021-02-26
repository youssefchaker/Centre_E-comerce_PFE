const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    Store: {
        type: mongoose.Schema.ObjectId,
        ref: 'Store'
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        default: 0.0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category:{
        type:String,
        required:[true,'please specify the desired category'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                "Books",
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ]}
    },
    stock:{
        type:Number,
        required:[true,'please specify the number of products added']
    },
    reviews:[{
        type:mongoose.Schema.ObjectId,
        ref: 'Review'
    }],
    nbReviews:{
        type:Number,
        default:0
    },
    creationdate:{
        type:Date,
        default:Date.now
    },
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