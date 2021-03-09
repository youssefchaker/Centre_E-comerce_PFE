
const express=require('express');
const app=express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const path = require('path')
const bodyParser = require('body-parser')


const errorMiddleware = require('./middlewares/errors')

//setting up .env
dotenv.config({path:"Back-end/config.env"});



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())




//importing all routes
const products = require('./routes/product');
const stores = require('./routes/store');
const orders = require('./routes/order');
const auth = require('./routes/auth');
const events = require('./routes/event');



app.use('/api/mall', products)
app.use('/api/mall', stores)
app.use('/api/mall', orders)
app.use('/api/mall', auth)
app.use('/api/mall', events)





if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}


// Middleware to handle errors
app.use(errorMiddleware);


module.exports= app