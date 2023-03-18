const cors = require('cors')
const cookieParser = require('cookie-parser')
const express = require('express')
app = express()
const { register, login } = require('./routes/user.route')
const flight = require('./routes/Flight.route')
const booking = require('./routes/booking.route')
const dashboard = require('./routes/dashboard.route')

const connection = require('./config/db')
const authenticate = require('./middleware/Authentication/auth')

const port = 3200


app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.get('/', (req, res) => {
    res.send({ 'msg': 'welocme' })
})
app.use('/api/register', register)
app.use('/api/login', login)
app.use('/api/flights', flight)
app.use('/api/booking', booking)
app.use('/api/dashboard', dashboard)

app.get('/reports', authenticate, (req, res) => {
    res.send({ 'data': 'reports' })
})


app.listen(port, async () => {
    try {
        await connection
        console.log(`your db is connected to port ${port}`);
        // runsocket()
    } catch (err) {
        console.log('err on connecting db:', err);
    }
})