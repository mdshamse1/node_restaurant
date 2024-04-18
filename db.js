const { connect } = require('http2');
const mongoose = require('mongoose'); 
const { connected } = require('process');

// define mongodb connectin url 
const mongoURL = 'mongodb://localhost:27017/hotels';

// setup mongodb conection 
mongoose.connect(mongoURL,{
});

// create obj that interact with datab
const db = mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to mongoDB server!");
});
db.on('error',()=>{
    console.log("MongoDB connection error: ", err);
})
db.on('disconnected',()=>{
    console.log("Disconnected from mongoDB server");
})

// export database connection 
module.exports=db;