const express = require('express')
const router = express.Router();


const {
    addEvent,
    deleteEvent,
    getallEvents,
    getEvent,
    updateEvent
} = require('../controllers/eventcontroller')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

//a store adds an event

router.route('/store/event/new').post(/*isAuthenticatedUser,authorizeRoles("store"),*/addEvent);

//a store deletes an event

router.route('/store/event/:id').delete(/*isAuthenticatedUser,authorizeRoles("store"),*/deleteEvent);

//a store gets an event

router.route('/store/event/get/:id').get(/*isAuthenticatedUser,authorizeRoles("store"),*/getEvent);

//a store updates an event

router.route('/store/event/update/:id').put(/*isAuthenticatedUser,authorizeRoles("store"),*/updateEvent);

//the admin gets an event

router.route('/admin/event/get/:id').get(/*isAuthenticatedUser,authorizeRoles("admin"),*/getEvent);

//the admin gets all the events

router.route('/admin/events').get(/*isAuthenticatedUser,authorizeRoles("admin"),*/getallEvents);

//the admin deletes an event 

router.route('/admin/event/:id').delete(/*isAuthenticatedUser,authorizeRoles("admin"),*/deleteEvent);


module.exports = router;