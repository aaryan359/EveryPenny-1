require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authroutes = require('./src/routes/Auth.Routes')
const dbConnect = require('./src/db/dbConnect')


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

dbConnect();


//Route for the register and login
app.use('api/auth',authroutes);



app.listen(8888,()=>{
    console.log('server is listing on the port 8888');
})


