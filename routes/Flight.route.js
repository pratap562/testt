const express = require('express');
const authenticate = require('../middleware/Authentication/auth');

const flight = express.Router()
const FlightModel = require('../Models/Flight.Model')

flight.post('/', authenticate, async (req, res) => {
    const { airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price } = req.body;

    if (!airline || !flightNo || !departure || !arrival || !departureTime || !arrivalTime || !seats || !price) {
        return res.status(400).json({ message: 'bad request' });
    }

    try {
        const newFlight = new FlightModel({
            airline,
            flightNo,
            departure,
            arrival,
            departureTime: new Date(departureTime),
            arrivalTime: new Date(arrivalTime),
            seats,
            price
        });

        try {
            await newFlight.save()
            return res.status(201).json({ message: 'Flight added successfully.' });
        } catch (err) {
            return res.status(500).json({ message: 'Error while saving flight to database.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error while adding flight to database.' });
    }
})


flight.get('/', authenticate, async (req, res) => {
    const now = new Date();
    let flightData
    try {
        flightData = await FlightModel.find({ seats: { $gte: 1 }, departureTime: { $gte: now } })
        return res.status(200).json({ flightData })
    } catch {
        return res.status(500).json({ message: 'Error while fetching Flight data' });
    }
});

flight.get('/:id', authenticate, async (req, res) => {
    const { id } = req.params
    const now = new Date();
    let flightData
    try {
        flightData = await FlightModel.findById(id)
        return res.status(200).json({ flightData })
    } catch {
        return res.status(500).json({ message: 'Error while fetching Flight data' });
    }
});

flight.patch('/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.body, 'bosyyy');
    try {
        let updatedData = await FlightModel.findByIdAndUpdate(id, req.body, { new: true })
        console.log(updatedData);
        return res.status(204).json({ updatedData })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error while updating Flight data' });
    }
});
flight.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params
    try {
        await FlightModel.findByIdAndDelete(id)
        return res.status(202).json({ msg: 'fligh Deleted sucessfully' })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error while Deleting Flight' });
    }
});

module.exports = flight