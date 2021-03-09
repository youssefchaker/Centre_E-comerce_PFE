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
        type:String
    }
    
})

module.exports = mongoose.model('Event', eventSchema);