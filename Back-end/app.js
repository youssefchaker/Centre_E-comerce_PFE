
const express=require('express');
const app=express();
const dotenv =require('dotenv');
dotenv.config({path:"Back-end/config.env"});


const products = require('./routes/product');
const auth = require('./routes/auth');
const reviews=require('./Routes/Review');


app.use('/api/mall', products)
app.use('/api/mall', auth)
app.use('/api/mall', reviews)

module.exports=app;