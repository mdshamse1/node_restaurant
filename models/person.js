const mongoose = require('mongoose');
const { type } = require('os');
const bcrypt = require('bcrypt');
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
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

});

personSchema.pre('save',async function(next){
    const person = this;
     // hash password only if it has been modified (or is new)
     if(!person.isModified('password')) return next();
    try{
       const salt = await bcrypt.genSalt(10);

       //has password
       const  hashedPassword=await bcrypt.hash(person.password ,salt );
       person.password=hashedPassword ;
        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //use bcrypt to compare the provided password with the hash password
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

// create person model 
const  Person = mongoose.model("Person",personSchema);
module.exports = Person;