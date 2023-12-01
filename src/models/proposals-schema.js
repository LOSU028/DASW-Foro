"use strict";

const mongoose = require("mongoose");

const ProposalSchema =  mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    _userid: {
        type: String,
        required: true
    },
    _username: {
        type: String,
        required: true
    },
    _title: {
        type: String,
        required: true
    },
    _content: {
        type: String,
        required: true
    },
    _likes: {
        type: Number,
        required: true
    },
    _dislikes: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Proposal', ProposalSchema);