const Booking = require('../models/Booking');
// const Trip = require('../models/Trip');



// Create a new booking
exports.createBooking = async(req, res) =>{
    try{
        const {transportId, flightDetails, passengerDetails, journeyDate} = req.body;

        if (!transportId && !flightDetails) {
            return res.status(400).json({ message: " Transport ID or Flight Details are required" });
        }

        const booking = await Booking.create({
            userId: req.user._id,
            transportId: transportId || null,
            flightDetails: flightDetails || null,
            passengerDetails, 
            journeyDate
        });

        res.status(201).json({
            message: 'Booking created successfully',
            booking
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
// auto-complete bookings that have passed their journey date
const autoCompleteBookings = async () => {
    const now = new Date();
    await Booking.updateMany(
        {
            status: "confirmed",
            journeyDate: { $lt: now }
        },
        {
            status: "completed"
        }
    );
};
// Get bookings for a user
exports.getMyBookings = async (req, res) =>{
    try{
        const bookings = await Booking.find({userId: req.user._id, status: "confirmed"}).populate({
            path: 'transportId'
        })

        res.status(200).json({
            bookings
        });
    }catch(error){
        res.status(500).json({message: error.message});
    };
}
// booking history for user
exports.getBookingHistory = async (req, res) => {
    try {
        await autoCompleteBookings();

        const bookings = await Booking.find({
            userId: req.user._id,
            status: {
                $in: ['cancelled', 'completed']
            }
        }).populate("transportId");

        console.log(
            JSON.stringify(bookings, null, 2)
        );

        res.status(200).json({ bookings });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Cancel a booking
exports.cancelBooking = async(req, res) =>{
    try{
        // await autoCompleteBookings();
        const book = await Booking.findById(req.params.id);
        if(!book){
            return res.status(404).json({message: 'Booking not found'});
        }
        
        // check ownership
        if(book.userId.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'Not authorized to cancel this booking'});
        }

        // update status to cancelled
        book.status = 'cancelled';
        await book.save();

        // send response
        res.status(200).json({
            message: 'Booking cancelled successfully',
        });
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}