const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const  cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is up and running on port number ${port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })






