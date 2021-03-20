const Event = require('../models/event');
const Store = require('../models/store');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// a store adds an event   =>   api/mall/store/event/new

exports.addEvent = catchAsyncErrors(async (req, res, next) => {

    const {storeName,eventName , eventDateStart,eventDateFinish , eventImage } = req.body;    
    const store = await Store.findOne({name:storeName}).populate('store')

        
        if(!store){
            return next(new ErrorHandler('Store not found', 404));
        }     
        const event = await Event.create({
            eventName,
            eventDateStart,
            eventDateFinish,
            store,
            eventImage
        })
        res.status(201).json({
            success: true,
            message:"event created!",
            event
        })
    
})

//a store or admin deletes an Event   =>   api/mall/store/event/:id   or   api/mall/admin/event/:id

exports.deleteEvent = catchAsyncErrors(async (req, res, next) => {

        const event = await Event.findById(req.params.id);
            if (!event)
                return next(new ErrorHandler('Event not found', 404));
            event.remove();
            res.status(200).json({
                success: true,
                message: 'Event is deleted.'
            })
})

//go to the event's store => api/mall/event/:id

exports.getEvent = catchAsyncErrors(async (req, res, next) => {

    const event = await Event.findById(req.params.id);
        if (!event)
            return next(new ErrorHandler('Event not found', 404));
        const eventstore=event.store;
        res.status(200).json({
            success: true,
            eventstore
        })
})

// get limited events for the home page  =>   api/mall/events/limited

exports.getEventsLimited = catchAsyncErrors(async (req, res, next) => {

    const events = await Event.find().limit(5);
    if (events.length==0) {
        return next(new ErrorHandler('there are no events in the website at the moment', 404));
    }
    else{
        res.status(200).json({
            success: true,
            events
        })
    }
})

// get all events for the event page  =>   api/mall/events

exports.getEvents = catchAsyncErrors(async (req, res, next) => {

    const events = await Event.find();
    if (events.length==0) {
        return next(new ErrorHandler('there are no events in the website at the moment', 404));
    }
    else{
        res.status(200).json({
            success: true,
            events
        })
    }
})

// get all events for a speicifc store  =>   api/mall/store/events

exports.getStoreEvents = catchAsyncErrors(async (req, res, next) => {

    const events = await Event.findById(req.query.id);
    if (events.length==0) {
        return next(new ErrorHandler('there are no events in the website at the moment', 404));
    }
    else{
        res.status(200).json({
            success: true,
            events
        })
    }
})

// the admin gets all the events  =>   api/mall/admin/events

exports.getAllEvents = catchAsyncErrors(async (req, res, next) => {

    const events = await Event.find();
    if (events.length==0) {
        return next(new ErrorHandler('there are no events in the website at the moment', 404));
    }
    else{
        res.status(200).json({
            success: true,
            events
        })
    }
})

//the store Updates an Event   =>   api/mall/store/event/:id

exports.updateEvent = catchAsyncErrors(async (req, res, next) => {

    const event = await Event.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});
    if(!event)
        return next(new ErrorHandler('Event not found', 404));
    res.status(200).json({
        success: true,
        event
    })
})


