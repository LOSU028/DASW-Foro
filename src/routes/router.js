"use strict";

const express = require("express");
const router = express.Router();
const propolsalsRouter = require('./proposals');
const adminRouter = require('./admin');
const mainRouter = require('./main')
const registroRouter = require('./registro')
const baseRoute = __dirname.slice(0, -10);

router.use('/proposals',propolsalsRouter);
router.use('/admin', validateAdmin,adminRouter);
router.use('/main', mainRouter)
router.use('/registro', registroRouter)


router.get('/', (req, res) => {
    res.sendFile(baseRoute + "/public/login_page.html")
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