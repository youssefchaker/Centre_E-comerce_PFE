const Event = require('../models/Event');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Store=require('../Models/Store');

// a store adds an event   =>   /store/event/new

exports.addEvent = catchAsyncErrors(async (req, res, next) => {

    const {storename,eventname , eventdate , eventimage } = req.body;    
    await Store.findOne({name:storename})
    .populate('store')
    .exec(function(err, store) {    
        if(!store){
            return next(new ErrorHandler('Store not found', 404));
        }     
        const event =Event.create({
            eventname,
            eventdate,
            store,
            eventimage
        })
        res.status(201).json({
            success: true,
            message:"event created!"
        })
    });
})

//a store or admin deletes an Event   =>   /store/event/:id  /admin/event/:id

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

//a store or admin gets an event   =>   /store/event/get     /admin/event/get/:id

exports.getEvent = catchAsyncErrors(async (req, res, next) => {

    const event = await Event.findById(req.params.id).limit(1);
        if (!event)
            return next(new ErrorHandler('Event not found', 404));
        res.status(200).json({
            success: true,
            event
        })
})
    
// the admin gets all the events  =>   /admin/events

exports.getallEvents = catchAsyncErrors(async (req, res, next) => {

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

//the store Updates an Event   =>   /store/event/update/:id

exports.updateEvent = catchAsyncErrors(async (req, res, next) => {

    const event = await Event.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});
    if(!event)
        return next(new ErrorHandler('Event not found', 404));
    res.status(200).json({
        success: true,
        event
    })
})
