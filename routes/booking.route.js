const express = require('express')
const authenticate = require('../middleware/Authentication/auth')

const booking = express.Router()
const BookingModel = require('../Models/Booking.Model')
const FlightModel = require('../Models/Flight.Model')

booking.post('/:flight_id', authenticate, async (req, res) => {
    try {
        // Extract the user ID and flight ID from the request body
        const { user_id } = req.body;

        const { flight_id } = req.params


        // Find the flight by its ID and check if there are available seats
        const flight = await FlightModel.findById(flight_id)
        if (flight.seats < 1) {
            return res.status(400).json({ err: 'No available seats on this flight' })
        }

        // Create a new booking object and save it to the database
        const booking = new BookingModel({
            user: user_id,
            flight: flight_id
        });
        await booking.save();

        // Decrement the number of available seats on the flight
        const updatedFlight = await FlightModel.findByIdAndUpdate(
            flight_id,
            { $inc: { seats: -1 } },
            { new: true }
        )
        // Send a response indicating that the booking was successful
        return res.status(201).json({ msg: 'Flight Booking successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "error while booking flight" });
    }
})

module.exports = booking
// endpoint should allow the user to book flights.