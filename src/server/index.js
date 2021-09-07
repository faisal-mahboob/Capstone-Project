const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mockAPIResponse = require('./mockAPI.js')
const fetch = require('node-fetch');
const app = express();
const aylien = require('aylien_textapi');
app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
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

var user = process.env.un;
const baseURL = "http://api.geonames.org/searchJSON?q=";

let  geoData=[];

app.post('/getData', async (req, res) => {
    let city = req.body.ci;
    console.log(`This is the ${city}`);
    console.log(`This is the username: ${process.env.un}`)
    const response = await fetch(`${baseURL}${city}&maxRows=1&username=${process.env.un}`, { method: "POST" });
    try {
        let bata = await response.json();
        console.log(bata);
        geoData.push(bata);
        res.send(bata);
    }
    catch (error) {
        console.log("error", error)
    }
})

let weatherData=[];

app.post('/weatherData', async (req, res, url = '', sata = {}) => {
    let longitude = req.body.longit;
    let latitude = req.body.latit;
    console.log(`longitude:${longitude}`);
    console.log(`latitude:${latitude}`);

    //console.log(`This is the vacation start: ${start}`);
    //console.log(`This is the return: ${finish}`)
    const response = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${process.env.weather_API_KEY}`, { method: "POST" });
    try {
        let sata = await response.json();
        weatherData.push(sata);
        console.log(sata);
        res.send(sata);

    }
    catch (error) {
        console.log("error", error)
    }
})

let forecastD=[];

app.post('/forecastData', async (req, res, url = '', vata = {}) => {
    let longitude2 = req.body.longit;
    let latitude2 = req.body.latit;
    console.log(`Longitude2:${longitude2}`);
    console.log(`latitude2:${latitude2}`);

    //console.log(`This is the vacation start: ${start}`);
    //console.log(`This is the return: ${finish}`)
    const response2 = await fetch(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude2}&lon=${longitude2}&key=${process.env.weather_API_KEY}`, { method: "POST" });
    try {
        let vata = await response2.json();
        forecastD.push(vata);
        console.log(vata);
        res.send(vata);

    }
    catch (error) {
        console.log("error", error)
    }
})

let pixaData=[];

app.post('/pixabayData', async (req, res) => {
    let coun = req.body.cityvacat;   

    //console.log(`This is the vacation start: ${start}`);
    //console.log(`This is the return: ${finish}`)
    const response = await fetch(`https://pixabay.com/api/?key=23223032-495ce91a058e3a57765110a18&q=${coun}&image_type=photo`, { method: "POST" });
    try {
        let fata = await response.json();
        console.log(fata);
        pixaData.push(fata);
        res.send({ fata});
        return fata;

    }
    catch (error) {
        console.log("error", error)
    }
})

/* //I comment out this section because no matter what i did i could not get the data from REST Countries API. Even the URL i'm sending the API is corrent.
app.post('/countryData', async (req, res) => {
    let cccc=req.body.cityvacat;
    console.log(cccc);
    let fcc=cccc[1];
    console.log(fcc);
    let obj = Object.assign({}, cccc);
    console.log(obj['1']);
    let dd=obj['1'];
    console.log(dd);
    let response = await fetch(`https://restcountries.eu/rest/v2/name/${dd}?fullText=true`,{
        method:"POST"
    });
    try{
        let fr= await response.text();
        console.log(fr);
        console.log("res is", req.body.fr);
        res.send(fr);
    }
    catch(error){
        console.log("error", error)
    }
})
*/
