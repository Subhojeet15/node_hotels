//express routers help managing end points
const express =require('express')
const router =express.Router();

const Person=require('./../models/Person' ) //importing the model from models folder 

//bring person related api or end points here
//post route to add a new person
router.post('/',async(req,res)=>{
    //post api creation
    //'/person' refers to ->the person keyword last at url,,http://localhost:3000/person(if someone send data person url)
    // const data=req.body //assuming the request body contains prson data
  
    // //create a new person document using the mongoose model
  
    // const newPerson= new Person(data);
  
    // //save newPerson to database
  
    // // newPerson.save((error,savedPerson)=>{
    // //   if(error){
    // //     console.log("error saving person data:",error);
    // //     res.status(500).json({error:'Internal server error'}) //server codes, depending upon th eserver from database, if sucess or not
    // //   }
    // //   else{
    // //     console.log("data successfully saved");
    // //     res.status(200).json(savedPerson)
    // //   }
    // // })this call  back(works after data saved in data base) is not needed here , as complex ,code readabilty is less, to avoid we use async  await instead use try(successfully saved in db)and catch(caught error) block
  
    //----------------------------insted we use try and catch like below----------------------------------------------------------------------//
    try                               //success category
    {
      const data=req.body //assuming the request body contains prson data
  
      //create a new person document using the mongoose model
    
      const newPerson= new Person(data);
    
      //save newPerson to database
    
      const response=await newPerson.save()
      console.log('data saved')
      res.status(200).json(response);
    }
  catch(err)//fail category
  {
  console.log(err);
  res.status(500).json({error:'Internal Server Error'});
    }
  })

  //get method to get the person,use get in postman to fetch data from database
router.get('/',async(req,res)=>{
    try{
      const data = await Person.find();  //find  all persons in the collection
      console.log('data fetched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
    res.status(500).json({error:'Internal Server Error'});
    }
  })

  //query param
router.get('/:workType',async(req,res)=>{
    try{
     const workType =req.params.workType; //Extract the work type from the URL parameter
     if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
     const response = await Person.find({work:workType});
     console.log('response fetched');
   res.status(200).json(response);
     }else{
       res.status(404).json({error:'Invalid work type'});
     }
   }catch(err){
   console.log(err);
   res.status(500).json({error:'Internal Server Error'});
     }
    
   })
  

//new routes for update operation(we use PUT/PATCH  method)
//har documents mai _id unique hai in dbms
//two criterions are present in PUT which are update get and post

router.put('/:id',async(req,res)=>{    //person_id customer bhjega unique id jo mongo db mai hai ,to find the required persom
    try{  //sucess
        const personID = req.params.id;  // Extract id from url parameter
        const updatedPersonData = req.body; //body parser joo bhi data client bhej raha usko req.body mai save karta, wahi  data bhejega((update data for the person))
        
        const response = await Person.findByIdAndUpdate(personID,updatedPersonData,{
            new:true, //Return the updated document
            runValidators:true, //Run Mongoose validation 
        })

        if(!response){  //when id given by the client is not present in the the db 
            return res.status(404).json({error:'Person Not Found'});
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
        const personId = req.params.id;   // Extract id from url parameter

        //assuming u have a person model
        const response=await Person.findByIdAndDelete(personId);  //inbuilt javascript function findByIdAndDelete and findByIdAndUpdate
        if(! response){
           return res.status(404).json({error:'Person Not Found'});
        }
        console.log('data deleted successfully');
        res.status(200).json({message:'Person deleted successfully'});
        
    }catch(err){
            console.log(err);
            res.status(500).json({error:'Internal Server Error'});
    }
})


//removing all person from all api s 
//router.get('/person/:workType',async(req,res)=>router.get('/:workType',async(req,res)
//we use async -await here because we have used promises before (because we dont know kitna time lagega)

module.exports=router;