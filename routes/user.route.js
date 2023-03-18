const express = require('express')
const bcrypt = require('bcrypt')
const dotevn = require('dotenv')
const jwt = require('jsonwebtoken')

const register = express.Router()
const login = express.Router()
const UserModel = require('../Models/User.Model')
dotevn.config()

register.post('/', async (req, res) => {
    const { email, password, name } = req.body
    if (!email || !password || !name || typeof (email) != 'string' || typeof (name) != 'string' || typeof (password) != 'string') {
        return res.status(400).json({ err: 'bad request' })
    }
    let userExist

    try {
        userExist = await UserModel.find({ email })
    } catch (err) {
        console.log('err', err);
        return res.status(500).json({ err: 'try after some time' })
    }
    console.log(userExist);
    if (userExist.length >= 1) {
        return res.status(403).json({ err: 'user allready exist' })
    }

    // password hashing
    console.log('pasword hashing', password)
    bcrypt.hash(password, 2, async function (err, hash) {
        console.log(hash, 'hash')
        if (err) {
            return res.status(500).json({ 'err': 'something went wrong try after some time' });
        }

        try {
            let newUser = new UserModel({ name, email, password: hash, })
            await newUser.save()
            console.log('user saved');
            return res.status(201).json({ 'msg': 'Signup Sucessfull' })
        } catch (err) {
            console.log(err);
            return res.status(500).json({ 'err': 'something went wrong try after some time' });
        }
    });
})


login.post('/', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password || typeof (email) != 'string' || typeof (password) != 'string') {
        return res.status(400).json({ err: 'bad request' })
    }
    // console.log('done')
    let userExist = await UserModel.find({ email })
    if (userExist.length == 0) {
        return res.status(404).json({ 'err': "user don't exist" })
    }
    console.log(userExist[0]);
    console.log(userExist, password, 'h')

    bcrypt.compare(password, userExist[0].password, function (err, result) {
        // result == false
        console.log(err);
        console.log(result);
        if (!result) {
            console.log('err:', err)
            return res.status(401).json({ 'err': 'bad credentials' })
        }
        // result == true
        console.log(userExist[0]._id, 'iiiii');
        console.log(userExist[0]._id.toString(), 'iiiii');
        let token = jwt.sign({ email, id: userExist[0]._id.toString() }, process.env.SECRETKEY, { expiresIn: 60 * 60 })
        console.log(token)
        console.log('hell')
        res.cookie('token', token, { httpOnly: true })

        return res.status(200).json({ 'msg': 'signin sucessfull' })
    });
})


module.exports = { register, login }