const mongoose=require('mongoose');

//define person schema

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        required: true
    },
    work:{
        type: String,
        enum: ['chef','waiter','manager'], //cant enter anything wxcept this
        required: true,
    },
    mobile:{
        type: String,
        unique: true,
        required:true
    },
    email:{
        type:String,
        unique: true,   //must be unique from others, so that no copy present,
        //whenever we get error in unique(not functioning unique)we can either delete the database or use (mongo <db-name>db.<collection-name>.reIndex()) or 
        //if you cannot delete you database try this in the mongo console
          //db.users.createIndex({username:1}, {unique:true})(main issue is re-indexing the database)
      required:true,
    },
    address:{
        type:String,
    },
    salary:{
        type: Number,
        required:true
    }


})


//Create Person model

const Person=mongoose.model('Person',personSchema)
module.exports=Person;