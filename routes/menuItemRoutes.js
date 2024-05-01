const express =require('express')
const router =express.Router();

const MenuItem=require('./../models/MenuItem')

//Get method for  to get menu Items
router.get('/',async(req,res)=>{
    try{
      const data = await MenuItem.find();  //find  all menus in the collection
      console.log('data fetched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
    res.status(500).json({error:'Internal Server Error'});
    }
  })
//Post Method to add new item into the database
router.post('/',async(req,res)=>{
  try                               //success category
  {
    const data=req.body 
    const newMenu= new MenuItem(data);
    const response=await newMenu.save()
    console.log('data saved')
    res.status(200).json(response);
  }
catch(err)//fail category
{
console.log(err);
res.status(500).json({error:'Internal Server Error'});
  }
})
router.get('/:tasteType',async(req,res)=>{
  try{
   const tasteType =req.params.tasteType; //Extract the work type from the URL parameter
   if(tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy'){
   const response = await MenuItem.find({taste:tasteType});
   console.log('response fetched');
 res.status(200).json(response);
   }else{
     res.status(404).json({error:'Invalid Taste Input'});
   }
 }catch(err){
 console.log(err);
 res.status(500).json({error:'Internal Server Error'});
   }
  
 })

 router.put('/:id',async(req,res)=>{    //person_id customer bhjega unique id jo mongo db mai hai ,to find the required persom
  try{  //sucess
      const menuID = req.params.id;  // Extract id from url parameter
      const updatedmenuData = req.body; //body parser joo bhi data client bhej raha usko req.body mai save karta, wahi  data bhejega((update data for the person))
      
      const response = await MenuItem.findByIdAndUpdate(menuID,updatedmenuData,{
          new:true, //Return the updated document
          runValidators:true, //Run Mongoose validation 
      })

      if(!response){  //when id given by the client is not present in the the db 
          return res.status(404).json({error:'Item Not Found'});
      }

      console.log('data updated');
      res.status(200).json(response)
  }catch(err){  //error
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
  }
})

//delete operation or record
//DELETE /persons/:id => delete a person with specified ID
//requires the id only to delete it

router.delete('/:id',async(req,res)=>{
  try{
      const menuId = req.params.id;   // Extract id from url parameter

      //assuming u have a person model
      const response=await MenuItem.findByIdAndDelete(menuId);  //inbuilt javascript function findByIdAndDelete and findByIdAndUpdate
      if(! response){
         return res.status(404).json({error:'Item Not Found'});
      }
      console.log('data deleted successfully');
      res.status(200).json({message:'Item deleted successfully'});
      
  }catch(err){
          console.log(err);
          res.status(500).json({error:'Internal Server Error'});
  }
})


module.exports=router
