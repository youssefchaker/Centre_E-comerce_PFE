
const express=require('express');
const app=express();
const dotenv =require('dotenv');
dotenv.config({path:"Back-end/config.env"});
const errorMiddleware = require('./middlewares/errors')
const products=require('./routes/Product');

app.use('/api/mall',products );
//app.use('/api/mall', require('./routes/Auth'))

// Middleware to handle errors
app.use(errorMiddleware);

module.exports=app;