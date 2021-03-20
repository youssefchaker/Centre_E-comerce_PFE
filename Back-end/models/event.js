const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventName:{
        type:String,
        required:[true, 'Please enter the event name']
    },
    eventDateStart:{
        type:Date,
        required:[true,'please enter a start date for the event']
    },
    eventDateFinish:{
        type:Date,
        required:[true,'please enter a finish date for the event']
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