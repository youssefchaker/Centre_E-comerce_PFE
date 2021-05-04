const mongoose = require('mongoose')
const validator = require('validator');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter store name'],
        maxLength: [100, 'store name cannot exceed 100 characters'],
        unique:true,
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Please enter phone number'],
        unique: true,
        
    },
    email: {
        type: String,
        required: [true, 'Please enter store email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    buisnessDomaine: {
        type: String,
        required: [true, 'Please select buisness domaine for this store'],
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
            message: 'Please select correct buisness domaine for the store'
        }
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: [true, 'Please enter valid postal code']
        
    },
    country: {
        type: String,
        required: true
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    subscriptionPrice: {
        type: Number,
        required: true,
        
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required:true,
    }
})

module.exports = mongoose.model('Store', storeSchema);