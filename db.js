//responsible for connecting database with server(db.js)
//too important file always keep it
const mongoose =require('mongoose');

//define the Mongodb connection url

const mongoURL='mongodb://localhost:27017/hotels'//replace 'hotels'with your database name
//connect to the MongoDB server using the URL defined above 
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

