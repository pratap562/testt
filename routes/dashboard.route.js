const express = require('express')
const authenticate = require('../middleware/Authentication/auth')

const dashboard = express.Router()
const BookingModel = require('../Models/Booking.Model')

dashboard.get('/', authenticate, async (req, res) => {
    try {
        const data = await BookingModel.find()
        return res.status(200).json({ data })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "error while fetching booking details" });
    }
})

module.exports = dashboard
// endpoint should allow the user to book flights.