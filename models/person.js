const mongoose = require('mongoose');
const { type } = require('os');

// Define person schema 
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        enum:['chef','manager','waiter'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    address:{
        type:String,

    },
    salary:{
        type:Number,
        required:true
    }

})

// create person model 
const  Person = mongoose.model("Person",personSchema);
module.exports = Person;