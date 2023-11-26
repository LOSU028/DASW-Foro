"use strict";

const express = require("express");
const router = express.Router();
const User = require('../../controllers/user');
const ProposalsSchema = require('../models/proposals-schema');
const userSchema = require('../models/users-schema');

//create user
//router.post


//Proposals
router.route('/proposals/:id')
    .delete((req,res) => {
        const { id } = req.params;
        ProposalsSchema
            .deleteOne({_id: id})
            .then(res.send("Proposal eliminated succesfully!").status(200))
            .catch((error) => res.json({message: error}).send(400));
    });

router.route('/proposals/:id/likes')
    .put((req,res) => {
        const { id } = req.params;
        const { likes } = req.body;
        //console.log(id);
        ProposalsSchema
            .updateOne({_id: id}, {$set: {_likes: likes}})
            .then((data) => res.send("Proposal likes updated succefully").status(200))
            .catch((error) => res.json({message: error}).send(400))
    });

router.route('/proposals/:id/dislikes')
    .put((req,res) => {
        const { id } = req.params;
        const { dislikes } = req.body;
        console.log(id);
        ProposalsSchema
            .updateOne({_id: id}, {$set: {_dislikes: dislikes}})
            .then((data) => res.send("Proposal dislikes updated succefully").status(200))
            .catch((error) => res.json({message: error}).send(400))
    });

router.route('/users')
    .post((req,res) => {
        if(!req.body){
            res.send("Body is empty");
        }
        
        
        let user = new User(req.body.email, req.body.username, req.body.age);
        console.log(user);
        const us = userSchema(user);
        us
            .save()
            .then((data) => res.send("User created succesfully!").status(200))
            .catch((error) => res.json({message: error}));
    })

    .get((req,res) => {
        userSchema
            .find()
            .then((data) => res.json(data).status(200))
            .catch((error) => res.json({message: error}).status(400));
    })

router.route('/users/:id')
    .put((req,res) => {
        const { id } = req.params;
        const { email, username, age} = req.body;
        userSchema
            .updateOne({_id: id}, {$set: {_email : email, _username: username, _age : age}})
            .then((data) => res.send("User updated succefully").status(200))
            .catch((error) => res.json({message: error}).send(400));
    })
    .get((req,res) => {
        const { id } = req.params;
        userSchema
            .findById(id)
            .then((data) => res.json(data).status(200))
            .catch((error) => res.json({message: error}).send(400))
    })

module.exports = router;