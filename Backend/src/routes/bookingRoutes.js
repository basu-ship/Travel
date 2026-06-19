const express = require('express');

const {createBooking,getMyBookings,cancelBooking, getBookingHistory} = require('../controllers/bookingController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/', authMiddleware, createBooking);
router.get('/',authMiddleware, getMyBookings);
router.get('/history', authMiddleware, getBookingHistory);
router.delete('/:id', authMiddleware,cancelBooking);

module.exports = router