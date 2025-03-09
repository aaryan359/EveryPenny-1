const express = require('express');
const  mongoose  = require('mongoose');


const app = express();
   const dbConnect = async()=>{
      try {


         const db = await mongoose.connect('mongodb+srv://aaryan:MX7sBmZ3545CcJXS@cluster0.ighbhj2.mongodb.net/everypenny1')

         console.log("DB Connected");
      } catch (error) {
         console.log("data base faied:",error);
      }


   }
module.exports = dbConnect;







