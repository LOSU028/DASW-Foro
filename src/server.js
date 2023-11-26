"use strict";

const express = require ("express");
const mongoose = require("mongoose");
const router = require("./routes/router");
const app = express();
const port = 3000;

//mongoDB connection 
mongoose
    .connect("mongodb+srv://LOSU:POaFGBlTR4qwjpoh@dasw.ujvlizg.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Conected to MongoDB Atlas"))
    .catch((error) => console.error(error));

//routes
app.use(express.json());
app.use(router);


app.listen(port, () => console.log("Server listening on port: " + port + "!"));
