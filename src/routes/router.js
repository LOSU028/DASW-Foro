"use strict";

const express = require("express");
const router = express.Router();
const propolsalsRouter = require('./proposals');
const adminRouter = require('./admin');

router.use('/proposals',propolsalsRouter);
router.use('/admin', validateAdmin,adminRouter);


router.get('/', (req, res) => {
    res.send("Proyecto de foro de propuestas DASW")
})
function validateAdmin(req, res, next){
    let adminToken = req.get('x-auth');
    if (adminToken == undefined || adminToken != "admin"){
        res.status(403).send("Youre not authorized");
    }
    else{
        next();
    }
}

module.exports = router;