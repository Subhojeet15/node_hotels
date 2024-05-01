const mongoose=require('mongoose');

const menuItemSchema = new mongoose.Schema({ //creating schema for  the menu items
    name:{
        type: String,
        required:true,
    },
    price:{
        type:Number,
        required:true,

    },
    taste:{
        type:String,
        enum:['sweet','sour', 'spicy'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false, //if client doesnt say anything default it is false
    },
    ingredients:{
        type:[String], //array type to enter  multiple ingredients
        default:[],
    },
    num_sales:{
        type:Number,
        default:0,
    }

})

const MenuItem=mongoose.model('MenuItem'/*<-file name*/ ,menuItemSchema /*<-schemaname*/)
module.exports=MenuItem;//exporting the model so that we can use in other files</