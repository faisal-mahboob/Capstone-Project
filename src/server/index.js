const dotenv=require('dotenv');
dotenv.config();
const path = require('path');
const cors= require('cors');
const express = require('express');
const bodyParser= require('body-parser');
const mockAPIResponse = require('./mockAPI.js')
const fetch= require('node-fetch');
const app = express();
const aylien=require('aylien_textapi');

app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
    //res.sendFile('dist/index.html', { root: __dirname + '/..' })
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
var textapi = new aylien({
    application_username: process.env.un,
    application_weather_API_KEY: process.env.weather_API_KEY
 });

var user=process.env.un;
const baseURL="http://api.geonames.org/searchJSON?q=";

app.post('/getData', async(req,res)=>{
    let city= req.body.ci;
    console.log(`This is the ${city}`);
    console.log(`This is the username: ${process.env.un}`)
    const response=await fetch(`${baseURL}${city}&maxRows=1&username=${process.env.un}`,{method:"POST"});
    try{
        let bata = await response.json();
        console.log(bata);
        res.send(bata);
    }
    catch(error){
        console.log("error",error)
    }
})

app.post('/weatherData', async(req,res,url='',sata={})=>{
    let longitude= req.body.longit;
    let latitude = req.body.latit;
    console.log(longitude);
    console.log(latitude);
    
    //console.log(`This is the vacation start: ${start}`);
    //console.log(`This is the return: ${finish}`)
    const response=await fetch(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=8e5fa18615e542969193eae68423f4a4`,{method:"POST"});
    try{
        let sata = await response.json();
        console.log(sata);
        res.send(sata);
        
    }
    catch(error){
        console.log("error",error)
    }
})