
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
//create schema

const EventSchema=new Schema({
    eventdate:{
        type:Date,
        required:[true,'please enter a date for the event']
    },
    eventname:{
        type:String,
        required:[true, 'Please enter the event name']
    },
    store:{
        type:mongoose.Schema.ObjectId,
        ref:'Store'
    },
    eventimage:{
        type:String,
        required:[false]
    }
});

module.exports=mongoose.model('Event',EventSchema);