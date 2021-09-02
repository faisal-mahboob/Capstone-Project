// Setup empty JS object to act as endpoint for all routes
const moData=[];

// Express to run server and routes
const express=require('express');

// Start up an instance of app
const app=express();

/* Dependencies */
const bodyParser = require('body-parser');
var dateFormat = require('dateformat');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port=1472;
// Spin up the server
const server = app.listen(port,listening);


// Callback to debug
function listening() {
    console.log('The server is running');
    console.log(`The server is running in localhost: ${port}`);
}

// Initialize all route with a callback function
var dateFormat = require('dateformat');
var d= new Date();
let projectData={};

// Callback function to complete GET '/all'
app.get('/all',function(req,res){
    res.send(projectData);
});

app.get('/root',function(req,res){
    res.send(moData);
});



// Post Route
app.post('/addAnimal',function(req,res){
    
 const newEntry={
        temperature:req.body.temperature,
        date:req.body.date,
        ui:req.body.ui
 }
    
    res.send(projectData);
    projectData=newEntry;
    console.log(projectData);
    
}); 

