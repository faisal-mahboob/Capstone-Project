import {cdates} from "../src/client/js/date.js"

describe("Testing the date function", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the function", ()=>{
        function cdates(){
        let vacatedate="2021/09/05";
        console.log(vacatedate);
        let q=new Date(vacatedate);   // making dates look the same
        console.log(q);
        let d=q.getTime();   //getting the while length of time since linux was made in milliseconds until this time
        console.log(`This is the miliseconds for the trip:${d}`);
    
        //console.log(vacatedate.toISOString());
        let c="2021/09/10";
        let current=new Date(c); //current date , same format as q(vacate date)
        console.log(current)
        let cd=current.getTime(); //all the milliseconds since linus was made until this time
       //console.log(`This is the vacateion date: ${freedom}
        console.log(`This is the current Date(milliseconds): ${cd}`);
    
        let compare=d-cd; // get the difference in milliseconds will give how much time there is between current date and vacation date in milliseconds
        console.log(`This is the changes : ${compare}`);
        const m_in_7_days=604800000; // milliseconds in a week 
    
        if((compare/m_in_7_days) < 1){ //dividing how much time between vacation date and current date by 7 days, if no. is above 1 , that means vacation day is after 7 days. if number is below 1 , that means the vacation date is less than 7 days 
    
            console.log("Trip start is within 7 days, curent weather data")
            return 1;
        }
        else{
            console.log("Trip start is above 7 days, forecast weather data")
            return 2;
    
        }
      
           // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
           // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
           expect(cdates()).toBe(1);
}
})});