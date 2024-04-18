const express = require('express');
const router = express.Router();

const person = require('../models/person');
const { message } = require('prompt');

router.post('/',async(req,res)=>{
    try{
        const data = req.body //assuming request body contains the person data

    //create person document using mongoose model
    const newPerson = new person(data);
    
    // save new person to the database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json(err,"Internal server error");
    }
})

// Get method to get person data 
router.get('/',async(req,res)=>{
    try{
        const data = await person.find();
        console.log("data fetched successfully");
    res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json(err,"Internal server error");
    }
})

// fetch according t work profession 

router.get('/:workType',async(req,res)=>{
    try{
        const workType = req.params.workType; //extract worktype for  url parameter
        const personData = await person.find({work: workType}) //filtering out the data based
        if(workType=='chef' || workType=='manager' || workType=='waiter'){
            console.log('data fetched');
            res.status(200).json(personData);
        }

    }catch(err){
        console.log(err);
        res.status(500).json(err,"Internal server error");
    }
   
})


// for update using id 
router.put('/:id',async(req,res)=>{
    try{
        const personId = req.params.id; //extract id from url params
        const updatePerson = req.body; //update data for the person

        const response = await person.findByIdAndUpdate(personId,updatePerson,{
            new:true, //return updated document
            runValidators:true //run mongoose validation
        })
        if(!response){
            return res.status(404).json({error:"Person not found"})
        }
        console.log("data updated")
        return res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json(err,"Internal server error");
    }
})

// deleting data from database 
router.delete('/:id',async(req,res)=>{
    try{
        const personId = req.params.id; 
        const deleteUser = await person.findByIdAndDelete(personId);
        if(!deleteUser){
            res.status(404).json({error:"user not found"})
        }
        console.log("data deleted")
        res.status(200).json({message:"data deleted successfully"})
    }catch(err){
        console.log(err);
        res.status(500).json(err,"Internal server error");
    }
})


module.exports = router;