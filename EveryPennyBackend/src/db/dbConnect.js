const express = require('express');
const  mongoose  = require('mongoose');
require('dotenv').config();

const app = express();
   const dbConnect = async()=>{
      try {


         const db = await mongoose.connect(process.env.MONGODB_URI)

         console.log("DB Connected");
      } catch (error) {
         console.log("data base faied:",error);
      }


   }
module.exports = dbConnect;







