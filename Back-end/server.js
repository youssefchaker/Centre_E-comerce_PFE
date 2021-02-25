const app=require('./app');
const express=require('express');
const path =require('path');
const connectdb = require('./config/databaseconnection');



app.use(express.json());
//connect to mongo
connectdb();

//production mode

if(process.env.NODE_ENV==='production'){
    //set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build', 'index.html'));
    })
}

//port

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`));

