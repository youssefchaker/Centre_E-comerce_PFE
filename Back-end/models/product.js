const mongoose = require('mongoose')
const Schema=mongoose.Schema;
const productSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    store: {
        type: mongoose.Schema.ObjectId,
        ref: 'Store',
        required: [true, 'Please enter product store']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price']
    },
    stock:{
        type:Number,
        required:[true,'please specify the number of products added'],
        default: 0
    },
    nbreviews:{
        type:Number,
        default:0
    },
    ratings: {
        type: Number,
        default: 0
    },
    creationDate:{
        type:Date,
        default:Date.now()
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
        enum: {
            values: [
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
            ],
            message: 'Please select correct category for product'

        }
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
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
],
user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
}
});
module.exports = mongoose.model('Product', productSchema);