const express = require('express')
const router = express.Router();


const {
    addEvent,
    deleteEvent,
    getAllEvents,
    getEvent,
    updateEvent,
} = require('../controllers/eventController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

//a store adds an event

router.route('/store/event/new').post(addEvent);


router.route('/store/event/:id')
               .delete(isAuthenticatedUser,authorizeRoles("Seller"),deleteEvent)
               .get(getEvent)
               .put(isAuthenticatedUser,authorizeRoles("Seller"),updateEvent);


router.route('/admin/event/:id')
               .get(isAuthenticatedUser,authorizeRoles("Admin"),getEvent)
               .delete(isAuthenticatedUser,authorizeRoles("Admin"),deleteEvent);


router.route('/admin/events').get(isAuthenticatedUser,authorizeRoles("Admin"),getAllEvents);




module.exports = router;