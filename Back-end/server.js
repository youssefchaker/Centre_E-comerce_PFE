const app=require('./app');
const express=require('express');
const dotenv =require('dotenv');
const connectdb = require('./config/databaseconnection');

app.use(express.json());



// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})



// setting up .env
dotenv.config({path:"Back-end/config.env"});


//connect to mongoDB
connectdb();



//production mode




//setting up port 
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})