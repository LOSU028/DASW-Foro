"use strict";

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    _email: {
        type: String,
        required: true
    },
    _username: {
        type: String,
        required: true
    },
    _age: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
