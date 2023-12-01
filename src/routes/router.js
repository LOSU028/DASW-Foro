"use strict";

const express = require("express");
const jwt = require("jsonwebtoken")
const router = express.Router();
require('dotenv').config()
const bodyParser = require('body-parser')
const propolsalsRouter = require('./proposals');
const adminRouter = require('./admin');
const jwtauth = require('../middleware/jwtauth')
const mainRouter = require('./main');
const registroRouter = require('./registro')
const baseRoute = __dirname.slice(0, -10);

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use('/proposals',propolsalsRouter);
router.use('/admin', jwtauth,adminRouter);
router.use('/main', mainRouter)
router.use('/registro', registroRouter)


router.get('/', (req, res) => {
    res.sendFile(baseRoute + "/public/login_page.html")
})

router.post('/login', urlencodedParser, (req,res) => {
    const { username, password } = req.body;

    const user = {username: 'admin', password: 'admin', username}
    console.log(req.body)

    if (user.password != password) {
        return res.status(403).json({
          error: "invalid login",
        });
    }

    const token = jwt.sign(user, process.env.MY_SECRET, { expiresIn: "10m" });
    res.cookie("token", token);
    return res.redirect("/main");

})




module.exports = router;