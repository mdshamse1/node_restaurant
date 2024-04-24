const express = require('express')
const app = express()
require('dotenv').config();
const db = require('./db');
// const Person = require('./models/person');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //store in req.body
const passport = require('./auth');



const PORT = process.env.PORT ||3000


// middle ware 
const logRequest = (req,res,next) =>{
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next();
}


app.use(logRequest);

const localAuthMiddleware = passport.authenticate('local',{session:false})



app.use(passport.initialize());


app.get('/',localAuthMiddleware,(req,res)=>{
    res.send("Hey code is worked!");
})


//get person routes here 
const personRoutes = require('./routes/personRoutes')
app.use('/person',localAuthMiddleware,personRoutes);

//get menu routes here 
const menuRoutes = require('./routes/menuRoutes');

app.use('/menu',menuRoutes)



app.listen(PORT,()=>{
    console.log("server is runing on port 3000 ")
})