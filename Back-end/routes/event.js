const express = require('express')
const router = express.Router();


const {
    addEvent,
    deleteEvent,
    getAllEvents,
    getEvent,
    updateEvent,
    getEventsLimited,
    getEvents,
    getStoreEvents
} = require('../controllers/eventController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/store/event/new').post(isAuthenticatedUser,authorizeRoles("Seller"),addEvent);
router.route('/events/limited').get(getEventsLimited);
router.route('/events').get(getEvents);
router.route('/event/:id').get(getEvent);

router.route('/store/event/:id')
               .delete(isAuthenticatedUser,authorizeRoles("Seller"),deleteEvent)
               .put(isAuthenticatedUser,authorizeRoles("Seller"),updateEvent);

router.route('/store/events').get(isAuthenticatedUser,authorizeRoles("Seller"),getStoreEvents);               

router.route('/admin/event/:id').delete(isAuthenticatedUser,authorizeRoles("Admin"),deleteEvent);


router.route('/admin/events').get(isAuthenticatedUser,authorizeRoles("Admin"),getAllEvents);




module.exports = router;