const express = require('express')
const app = express()
const db=require('./db')//connecting db from db.js file

const bodyParser=require('body-parser')
app.use(bodyParser.json())  //store in req.body ,, .json used because data in json format



app.get('/', function (req, res) {
  res.send('Hello World,welcome to my hotel ... how can i help you?')
})



//parameterised endpoint = http://localhost:3000/person/:work  [work=('chef',waiter,manager)]


//import the Router files
const personRoutes = require('./routes/personRoutes')
//Use routers
app.use('/person',personRoutes)  //=>from when person is t, it will go to personRoutes files and look for get or post method


const menuItemRoutes = require('./routes/menuItemRoutes')
app.use('/menu',menuItemRoutes)   //accessing the routes from menuItems using /MenuItem

app.listen(3000,()=>{
    console.log("Listening in port 3000")  //this 3000 is the  port number which we are listening on "http://localhost:3000"
})

































































































































































































































//after all data is saved in mongodb with unique genrated id

//learn async and await
//• Async Function (asyne):
// • An async function is a function that is designed to work v
// asynchronous operations. You declare a function as asyl
// the async keyword before the function declaration.
// • The primary purpose of an async function is to allow you
// await keyword inside it, which simplifies working with promises and
// asynchronous code.
// • Inside an async function, you san use await to pause ti
// of the function until a promise is resolved. This makes the
// appear more synchronous and easier to read.
// • Awalt (await):
// • The await keyword is used inside an async function to wait for the
// resolution of a oromise. It can only be used within an async function..
// When await is used, the function pauses at that line until the promise
// is resolved or relected, This allows vou to write code that appears
// sequential, even though its performing asynchronous tasks.

// app.post('/menu',async(req,res)=>{
//   try{
//     const data= req.body
//     const newMenu =new MenuItem(data);
//     const response =await newMenu.save();
//     console.log('data saved');
//     res.status(200).json(response);
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json({error:"Internal server error"});

//   }
// })

























































































































