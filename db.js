//responsible for connecting database with server(db.js)
//too important file always keep it
const mongoose =require('mongoose');
require('dotenv').config();

//define the Mongodb connection url

// const mongoURL=process.env.MONGODB_URL_LOCAL,, // mongodb:/localhost:0000/hotelss  (instead of hotels , mention the name of the database u are joing to use (url currently present in dot env file)//uses local computer's database or mongodb which is downloaded into my own personal computer
//connect to the MongoDB server using the URL defined above 
const mongoURL = process.env.MONGODB_URL //url to connect server and database with online one, using mongodb atlas
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true 
}) 
//Get the default connnection
//Mongoose maintains a default connection object representing the MongoDB connection
const db=mongoose.connection; //object used as bridge between mongodb  and node.js

//define event listeners for database connection,mongod already understands  these events such as  connected ,error and disconnected
//Checking if the DB is connected or not

db.on('connected',()=>{
    console.log('Connected to MongoDB server')
});
db.on('error',(error)=>{
    console.log('Error Connecting to Mongo DB Server!',err);
})

db.on('disconnected',()=>{
    console.log('Disconnected from Mongo DB server')
});
//Export the database connection
module.exports=db;//db responds mongodb connection

