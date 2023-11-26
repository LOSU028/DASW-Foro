"use strict";

const express = require("express");
const router = express.Router();
const Proposal = require('../../controllers/proposal');
const proposalsSchema = require("../models/proposals-schema");


router.route('/')
    .post((req,res) => {
        if(!req.body){
            res.send("Body is empty");
        }
        
        let proposal = new Proposal(req.body.userid, req.body.title, req.body.content);
        const prop = proposalsSchema(proposal);
        //console.log(req.body);
        prop
            .save()
            .then((data) => res.send("Proposal created succesfully!").status(200))
            .catch((error) => res.json({message: error}));

        //res.status(200).send("Proposal was succefully created in the database!");
    })
    
    //get of all proposals in the database
    .get((req,res) => {
        proposalsSchema
        .find()
        .then((data) =>  res.json(data))
        .catch((error) => res.json({message: error}));
    });
router.route('/:id')
        //get a proposal by id
        .get((req,res) => {
            const { id } = req.params;
            proposalsSchema
                .findById(id)
                .then((data) => res.json(data).status(200))
                .catch((error) => res.json({message: error}).send(400))
        })

        .put((req,res) => {
            const { id } = req.params;
            const { title, content} = req.body;
            proposalsSchema
                .updateOne({_id: id}, {$set: {_title : title, _content: content}})
                .then((data) => res.send("Proposal updated succefully").status(200))
                .catch((error) => res.json({message: error}).send(400));
        })

router.route('/:id/likes')
        .get((req,res) => {
            const { id } = req.params;
            //console.log(id);
            proposalsSchema
                .findById(id)
                .then((data) => res.json(data._likes).status(200))
                .catch((error) => res.json({message: error}).send(400))
        })

        

router.route('/:id/dislikes')
        .get((req,res) => {
            const { id } = req.params;
            //  console.log(id);
            proposalsSchema
                .findById(id)
                .then((data) => res.json(data._dislikes).status(200))
                .catch((error) => res.json({message: error}).send(400))
        })
module.exports = router;

