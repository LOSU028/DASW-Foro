"use strict";

const express = require("express");
const router = express.Router();
const Proposal = require('../../controllers/proposal');
const Comment = require('../../controllers/comments');
const proposalsSchema = require("../models/proposals-schema");
const CommentSchema = require('../models/comments-schema');


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
            .catch((error) => res.json({message: error}).send(400));

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

//comments

router.route('/:id/comments')
        .post((req, res) => {
            let comment = new Comment(req.body.userid, req.body.username, req.body.proposalid, req.body.content);
            const comm = CommentSchema(comment);
            comm 
                .save()
                .then((data) => res.send("Comment created succesfully!").status(200))
                .catch((error) => res.json({message: error}).send(400));

        })
        .get((req,res) => {
            const { id } = req.params;
            //console.log( id );
            CommentSchema
                .find({_proposalid: id})
                .then((data) => res.json(data).status(200))
                .catch((error) => res.json({message: error}).send(400))
        })
        
        router.route('/:id/comments/:userid')
        .put((req, res) => {
            const { id, userid } = req.params;
            const { content } = req.body;
    
            console.log("ID:", id);
            console.log("UserID:", userid);
            console.log("Content:", content);
    
            if (content !== undefined && content !== '' && content !== null) {
                CommentSchema
                    .updateOne({ _proposalid: id, _userid: userid }, { $set: { _content: content } })
                    .then((result) => {
                        if( result.matchedCount > 0){
                            console.log("Update Result:", result);
                            res.send("Comment updated successfully").status(200);
                        }else{
                            res.status(404).send("Comment not found");
                        }
                    })
                    .catch((error) => {
                        console.error("Update Error:", error);
                        res.status(500).json({ message: 'Internal server error' });
                    });
            } else {
                res.status(400).json({ message: 'Invalid content' });
            }
        });
    
module.exports = router;

