import { cdates } from "./date.js"

// i am wrapping the Event Listener in a function that i exported to index.js(client) , so that i can use it there.
export function Elistener() {           
  var f = document.getElementById("button").addEventListener('click', first);
}

export function first(e) {
//the variable results4 , results3,results and results2 are only to handle the UI/CSS , when info is being output

  let results4 = document.getElementById("picture").classList.remove('pic0');
  let results3 = document.getElementById("picture").classList.add('pic1');
  // let results4=document.getElementById("picture").setAttribute('visibility':'visible');

  let results = document.getElementById("hoi2").classList.remove('hoi2');
  let results2 = document.getElementById("hoi2").classList.add('hoi3');


  //getting the UI data here
  let ci = document.getElementById('cityinput').value;
  let cid = document.getElementById('vacationdate').value;
  let cir = document.getElementById('returndate').value;



  //making the first fetch call to get data from the geonamesAPI

  fetch("http://localhost:8081/getData", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ci })
  })
    .then(res => res.json())
    .then(function (bata, res) {
      console.log(bata);
      var longit = bata.geonames[0].lng;
      var latit = bata.geonames[0].lat;
      var country = bata.geonames[0].countryName;
      var cityvacat = bata.geonames[0].adminName1;

      
      //using console.log to see i get the right results

      console.log(`longitude:${longit}`)
      console.log(`latitude:${latit}`)
      console.log(`Country_Name:${country}`);
      console.log(`City_Name:${cityvacat}`);

    //Using Promise.All([]), because i am passing 2 variables. I am passing the variable with the right info to the next function through the 'then' promise chain as the next API will need the info
      return Promise.all([longit, latit, cityvacat, country])
    })
    .then(function ([longit, latit, cityvacat, country], res) {
      console.log(longit);
      console.log(latit);
      console.log(cityvacat);

      //setting up my API to get info from the weather API

      if (cdates(res) == 1) {
        fetch("http://localhost:8081/weatherData", {
          method: "POST",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ longit, latit })       //i need both longit and latit info in the apu url of the weatherAPI, also this url will give me the current weather from weatherAPI
        })
          .then(res => res.json())
          .then(function (res) {
            console.log(res.data[0]);
            let w1 = document.getElementById('weatherdata');
            let w2 = document.getElementById('weatherdata2');

            w1.innerHTML = res.data[0].temp;
            w2.innerHTML = res.data[0].weather.description;
          })
      }
      else {                                            //i set up the fetch call for the info of future forecasted weather from weatherAPI
        fetch("http://localhost:8081/forecastData", {
          method: "POST",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ longit, latit })
        })
          .then(res => res.json())
          .then(function (res) {
            console.log(res);
            let w3 = document.getElementById('weatherdata');
            let w4 = document.getElementById('weatherdata2');
            let w5 = document.getElementById('vacationdate').value;
            for (let i = 0; i < 16; i++) {
              if (w5 == res.data[i].datetime) {                          
                w3.innerHTML = res.data[i].temp;                                    //here im putting the temperature of the city and weather description of the specific date that the user input as vacation start date                                            
                w4.innerHTML = res.data[i].weather.description;                     //on the user browser for the next 15 days from the date noe(current date)
              }
              else if (i == 15) {
                w3.innerHTML = res.data[i].temp;                                   // IF THE vacation date is more than 15 days away from the current date , then i set up to show to forecasted weather 
                w4.innerHTML = res.data[i].weather.description;                     // of the 16th day (number 15 in the api code itself because they start counting from 0) from the forecast weatherAPI 
              } //closing of else if
            } //closing of the for loop

          }) //closing of previous .then
      } //closing of else
      return cityvacat;                                //once more using promise.all to pass two variables to the next then promise in this chain 
    }).then(function (cityvacat) {                                              // setting up the fetch call to get pictrue data from teh paxabayAPI
      //let city=document.getElementById("cityinput").value;
      console.log(cityvacat);

      fetch("http://localhost:8081/pixabayData", {
        method: "POST",
        mode: 'cors',
        credentials: "same-origin",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cityvacat })
      }).then(function (res) {

        return res.json()
      })
        .then(function (res) {                                   // setting up putting the picture on the user browser
          console.log(res.fata);
          let pic = document.getElementById("pic1").setAttribute("src", res.fata.hits[0].webformatURL);
          return cityvacat;
        }).then(function (cityvacat) {
          console.log(cityvacat);
          
          /* // i am commenting this out because after putting so much time i cant get the REST Countries API to send info back to the client,
          fetch("http://localhost:8081/countryData", {
            method: "POST",
            mode:'cors',
           credentials: "same-origin",
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify({cityvacat})
          })
            .then(res => res.json())
            .then(function (res) {
              console.log(res);
            })
            */

          let protom = document.getElementById("vacationdate").value;             //here i am just calcualting the length of stay
          let kat = document.getElementById("returndate").value;
          let begin = new Date(protom);                                           //i converted both the vacation date and return date to the same format with new Date()
          begin.getTime();                                                        //then i converted both of them to millinseconds using .getTime(). this milliseconds starts counting since the first time Linux was made.
          let katam = new Date(kat);
          katam.getTime();                                                        //it takes 86,400,000 milliseconds for a day. I used it to find how many days are there between current day and vacation date.
          let difference = ((katam - begin) / 86400000);                          //here i set up the equation to see (vacateion day - current day)/86400000, the result will be a number of days between vacation date and the current day
          let s = document.getElementById("leng");
          s.innerText = difference;
        })

    })
  }



////// The End of the code ///////


////Rough scribbles down here/////

  //setTimeout(fetch("http://localhost:8081/countryData")
  // .then(function (pata) {
  //  console.log(pata);
  // }),6000);



  //return fata;

  //.then(function(fata){
  //console.log(`This is the it:${fata}`)
  //let pic=document.getElementById("pic1").getAttribute("src");
  //pic.innerHTML=hits[1].previewURL;
  //})




/*
fetch("http://localhost:8081/weatherData", {
  method: "POST",
  mode: "cors",
  credentials: "same-origin",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ longit, latit })
})
  .then(res => res.json())
  .then(function (res) {
    let weathercheck = cdates(res);
    if (weathercheck == 1) {
      //console.log(" It is with inside ")
      console.log(res.data[0]);
      let w1 = document.getElementById('weatherdata');
      let w2 = document.getElementById('weatherdata2');
      w1.innerHTML = res.data[0].temp;
      w2.innerHTML = res.data[0].weather.description;
    }
    else {
      fetch('http:///localhost:8081/forecastData', {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ logitude2, latitude2 })
      }).then(res => res.json())
        .then(function (res) {
          console.log(res.data[0]);
          let w3 = document.getElementById('weatherdata');
          let w4 = document.getElementById('weatherdata2');
          w1.innerHTML = res.data[0].temp;
          w2.innerHTML = res.data[0].weather.description;
      console.log("it is outside , future forecast")
    })
}
*/



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

