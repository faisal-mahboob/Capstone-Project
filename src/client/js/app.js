import {cdates} from "./date.js"

var f= document.getElementById("button").addEventListener('click',first);

export function first(e){
let ci=document.getElementById('cityinput').value;
let cid=document.getElementById('vacationdate').value;
let cir=document.getElementById('returndate').value;

fetch("http://localhost:8081/getData",{
  method:"POST",
  credentials:"same-origin",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({ci})
})
.then(res=>res.json())
.then(function(bata){
  console.log(bata);
  var longit=bata.geonames[0].lng;
  var latit=bata.geonames[0].lat;
  const country=bata.geonames[0].countryName;
  
  console.log(`longitude:${longit}`)
  console.log(`latitude:${latit}`)
  console.log(`Country_Name:${country}`);
  return Promise.all([longit,latit])
})
.then(function([longit,latit]){
  console.log(longit);
  console.log(latit);
  fetch("http://localhost:8081/weatherData",{
    method:"POST", 
    mode:"cors",
    credentials:"same-origin",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({longit,latit})
})})
.then(res=>res.json())
  .then(function(sata){
    console.log(sata.data[0].temp);
  })
  
}



//const {response}=require("express");

//const { response } = require("express");

/*const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const comma = ',';
const apiKey = "&appid=313c0286de9914455968cabaeedf7a88&units=metric";

document.getElementById('generate').addEventListener('click',perform);

function perform(e){
  const zip=document.getElementById('zip').value;
  const countrycode=document.getElementById('countrycode').value;
  const ui=document.getElementById('feelings').value;
  const date = new Date();
  allData(baseURL,zip,comma,countrycode,apiKey)
  .then(function(nData){
    postData('/addAnimal',{temperature:nData.main.temp,date:date,ui:ui})
  })
  .then(function(newData){
    projecGet('/all')
  })
  .then(function(dat){
    updateUI()
  })
  setTimeout(function e(){
  document.getElementById("labelt").innerHTML="Temperature (Celcius)";
  let tempo = document.getElementById("temp").textContent;
  document.getElementById("texting").textContent= tempo;
},500);
}*/

/*
const allData = async (baseURL,zip,comma,countrycode,apiKey)=>{
    //console.log(data);
    //const request = await fetch (baseUrl+city+apiKey);
    const request = await fetch(baseURL+zip+comma+countrycode+apiKey);
        try{
        const nData = await request.json();
        console.log(nData);
        return nData;
    }
    catch(error){
        console.log('error',error);
    }
}

//allData('/addMovie', {movie:'matrix', score:5});


const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

  const projecGet = async(url)=>{
    const request = await fetch(url);
    try{
      const dat=request.json();
      console.log(dat);
      return dat;
    }
    catch(error){
      console.log("error",error);
    }
  }


  const updateUI = async(url)=>{
    const request = await fetch('/all');
    try {
      const allData = await request.json();
      document.getElementById('temp').innerHTML= allData.temperature;
      document.getElementById('date').innerHTML= allData.date;
      document.getElementById('content').innerHTML= allData.ui;

    }
    catch(error){
      console.log('error',error);
  } 
}



//postData('/add', {answer:42});   

 
*/