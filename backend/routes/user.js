const mongoose = require('mongoose')
const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const check_auth = require('../middleware/check_auth');
const router = express.Router();

router.post('/signup',
    async (req, res) => {
        let success = false;
        const user = await User.find({ email: req.body.email }).exec();
        console.log(user.length)
        if (user.length >= 1) {
            return res.status(400).json({
                success: false,
                message: "Mail Exists"
            })
        } else if (user.length <= 0) {
            const hashPassword = await bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        error: err
                    })
                } else {
                    const newUser = await new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                    }).save();
                    // console.log(newUser);
                    return res.status(200).json({
                        success: true,
                        user: newUser
                    })
                }
            })
        }
    })
//     User.find({ email: req.body.email })
//         .exec()
//         .then(user => {
//             if (user.length >= 1) {
//                 return res.status(400).json({
//                     message: 'Mail Exists'
//                 });
//             } else {
//                 bcrypt.hash(req.body.password, 10, (err, hash) => {
//                     if (err) {
//                         return res.status(500).json({
//                             error: err
//                         })
//                     } else {
//                         const user = new User({
//                             _id: new mongoose.Types.ObjectId(),
//                             name: req.body.name,
//                             email: req.body.email,
//                             password: hash,
//                         })
//                         user.save()
//                             .then(result => {
//                                 console.log(result);
//                                 res.status(200).json({
//                                     message: 'User Created',
//                                     User: user
//                                 });
//                             })
//                             .catch(err => {
//                                 console.log(err);
//                                 res.status(500).json({
//                                     error: err
//                                 })
//                             })
//                     }
//                 })
//             }
//         })
// })

router.post('/login', async (req, res) => {
    let success = false;
    const { email, password } = req.body;
    const user = await User.find({ email: email }).exec()
    console.log(user);
    if (user.length <= 0) {
        return res.json({ success: false, message: "User Not Found" })
    } else {
        const comparePassword = await bcrypt.compare(password, user[0].password, async (err, result) => {
            if (err) {
                return res.status(400).json({ success: false, message: "Invalid Credential" })
            } else if (result) {
                const token = await jwt.sign({
                    userId: user[0]._id,
                },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1d"
                    });
                const updated = await User.findOneAndUpdate({ email: email }, { $set: { token: token } })
                return res.status(200).json({
                    success: true,
                    token: token
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Something went wrong"
                })
            }
        })
    }
})

router.post('/logout', check_auth, async (req, res) => {
    let user = req.userData.userId;
    // console.log(user);
    await User.findByIdAndUpdate(user, { $set: { token: null } }).exec()
    res.status(200).json({
        message: 'User Logout',
    })
})

module.exports = router;