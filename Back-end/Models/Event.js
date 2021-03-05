
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//create schema

const EventSchema=new Schema({
    eventname:{
        type:String,
        required:[true, 'Please enter the event name']
    },
    eventdate:{
        type:Date,
        required:[true,'please enter a date for the event']
    },
    store:{
        type:mongoose.Schema.ObjectId,
        ref:'Store'
    },
    eventimage:{
        type:String
    }
});

module.exports=mongoose.model('Event',EventSchema);