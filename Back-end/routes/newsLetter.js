const express = require('express')
const router = express.Router();
const {
    subscribe
} = require('../controllers/newsLetterController')

router.route('/newsletter/subscribe').post(subscribe);

module.exports = router;