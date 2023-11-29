"use strict";

const express = require ("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const router = require("./routes/router");
const app = express();
const cors = require('cors');
var path = require('path');

const port = 3000;

//mongoDB connection 
mongoose
    .connect("mongodb+srv://LOSU:POaFGBlTR4qwjpoh@dasw.ujvlizg.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Conected to MongoDB"))
    .catch((error) => console.error(error));

app.use(cookieParser());
app.use(express.json());
app.use(cors())
app.use(router);
app.use(express.static(path.join(__dirname, 'web-integration')));


app.listen(port, () => console.log("Server listening on port: " + port + "!"));
