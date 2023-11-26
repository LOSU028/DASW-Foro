"use strict";

const mongoose = require("mongoose");

const CommentSchema =  mongoose.Schema({
    _userid: {
        type: String,
        required: true
    },
    _username: {
        type: String,
        required: true
    },
    _proposalid: {
        type: String,
        required: true
    },
    _content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);