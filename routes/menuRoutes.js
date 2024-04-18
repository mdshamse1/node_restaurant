const express = require('express');
const router =  express.Router();

const menu = require('../models/menu');
const { error } = require('console');
// menu for adding  food items in the restaurant 
router.post('/',async(req,res)=>{
    try{
        const menudata = req.body;
        // create menu document using mongoose 
        const newMenu = new menu(menudata);

        // save new menu to the database 
        const addmenu = await newMenu.save();
        console.log("menu data saved");
        res.status(200).json(addmenu);

    }catch (err) {
        console.log("Internal server error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
    
})

router.get('/',async(req,res)=>{
    try{
        const menudata = await menu.find();
        console.log("data fetched");
        res.status(200).json(menudata);

    }catch(err){
        console.log("Internal server error");
        res.status(500).json(err,"Internal server error");
    }
})

// fetch according to taste 
router.get('/:tasteType',async(req,res)=>{
    try{
        const tasteType = req.params.tasteType;
        // extract taste type for url parameter 
        const tasteData = await menu.find({taste:tasteType});
        if(tasteType =='sweet' || tasteType=='sour' ||tasteType=='spicy'){
            console.log('data fetched');
            res.status(200).json(tasteData);
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err,"Internal server error")
    }
})

// for update using id 
router.put('/:id',async(req,res)=>{
    try{
        const itemId=req.params.id; //extract id from url params 
        const updateItem = req.body;
        const response = await menu.findByIdAndUpdate(itemId,updateItem,{
            new : true, // return the updated documen
            runValidators:true //run mongose validation
        })
        if(!response) {
            return res.status(404).json({error:"Data not found"})
        }
        console.log("data updated")
        return res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json(err,"Internal server error")
    }
})

// delete data form database 
router.delete('/:id',async(req,res)=>{
    try{
        const itemId =req.params.id;
        const deleteItem = await menu.findByIdAndDelete(itemId);
        if(!deleteItem){
            res.status(404).json({error:"Item not found"})
        }
        console.log("deleted successfully");
        res.status(200).json({message:"Item delete successfully"})

    }catch(err){
        console.log(err);
        res.status(500).json(err,"Internal server error");
    }
})
module.exports = router;