const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticate = (req, res, next) => {
    const token = req.cookies?.token || req.headers.token
    console.log(req.cookies, 'll')
    console.log(token, token);
    if (token) {
        jwt.verify(token, process.env.SECRETKEY, function (err, decoded) {
            // while err
            if (err) {
                console.log('errorrr');
                return res.status(401).json({ 'msg': 'plg login' })
            } else {
                console.log('no');
                req.body.user_id = decoded.id
                req.body.email = decoded.email
                next()
            }
        })
    } else {
        res.status(401).json({ 'msg': 'plg login again' })
    }
}

module.exports = authenticate