const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    token: { type: String},
}, {versionKey: false})

module.exports = mongoose.model('user', UserSchema);