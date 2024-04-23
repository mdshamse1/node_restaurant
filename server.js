const express = require('express')
const app = express()
require('dotenv').config();
const db = require('./db')
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //store in req.body

app.get('/',(req,res)=>{
    res.send("Hey code is worked!");
})
const PORT = process.env.PORT ||3000

//get person routes here 
const personRoutes = require('./routes/personRoutes')
app.use('/person',personRoutes);

//get menu routes here 
const menuRoutes = require('./routes/menuRoutes')
app.use('/menu',menuRoutes)



app.listen(PORT,()=>{
    console.log("server is runing on port 3000 ")
})