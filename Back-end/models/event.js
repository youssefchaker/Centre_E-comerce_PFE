const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventName:{
        type:String,
        required:[true, 'Please enter the event name']
    },
    eventDate:{
        type:Date,
        required:[true,'please enter a date for the event']
    },
    store:{
        type:mongoose.Schema.ObjectId,
        ref:'Store',
        required: true
    },
    eventImage:{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }    }
    
})

module.exports = mongoose.model('Event', eventSchema);