"use strict";

const express = require("express");
const router = express.Router();
const baseRoute = __dirname.slice(0, -10);

router.route('/').get((req,res) => {
    res.sendFile(baseRoute + "/views/registro.html")
})

module.exports = router;