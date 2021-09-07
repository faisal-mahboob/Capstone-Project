
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const aylien = require('aylien_textapi');
app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import{first} from "../src/client/js/app.js"

let ci = 'Egypt';  
let output="-79.4163";
let bata={
    totalResultsCount: 997,
    geonames: [
      {
        adminCode1: '08',
        lng: '-79.4163',
        geonameId: 6167865,
        toponymName: 'Toronto',
        countryId: '6251999',
        fcl: 'P',
        population: 2600000,
        countryCode: 'CA',
        name: 'Toronto',
        fclName: 'city, village,...',
        adminCodes1: [Object],
        countryName: 'Canada',
        fcodeName: 'seat of a first-order administrative division',
        adminName1: 'Ontario',
        lat: '43.70011',
        fcode: 'PPLA'
      }
    ]
  }


  // The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the submit functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the handleSubmit() function", ()=>{
        fetch("http://localhost:8081/getData",{
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ci })
      }).then(res => res.json())
      .then(function (bata, res) {
        return bata.geonames[0].lng;
      })
           // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
           // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
           expect(bata.geonames[0].lng).toBe(output);
})});