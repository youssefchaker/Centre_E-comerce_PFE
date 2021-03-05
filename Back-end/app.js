
const express=require('express');
const app=express();
const dotenv =require('dotenv');
const bodyParser = require('body-parser');
dotenv.config({path:"Back-end/config.env"});
const errorMiddleware = require('./middlewares/errors')
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/mall',require('./routes/Product') );
app.use('/api/mall', require('./routes/Auth'));
app.use('/api/mall', require('./routes/Event'))

// Middleware to handle errors

app.use(errorMiddleware);
app.use(cookieParser);
module.exports=app;