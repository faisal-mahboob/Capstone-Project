const datefns = require("date-fns"); 

var cda= document.getElementById("button").addEventListener('click',cdates);
export function cdates(){
    let vacatedate= document.getElementById("vacationdate").value;

    let q=new Date(vacatedate);
    let d=q.getTime();
    console.log(`This is the miliseconds for the trip:${d}`);

    //console.log(vacatedate.toISOString());

    let current=new Date();
    let cd=current.getTime();
   //console.log(`This is the vacateion date: ${freedom}`);
    console.log(`This is the current Date(milliseconds): ${cd}`);

    let compare=d-cd;
    console.log(`This is the changes : ${compare}`);
    const m_in_7_days=604800000;

    if((compare/m_in_7_days) < 1){
        console.log(" It is with inside ")
    }
    else{
        console.log("it is outside")
    }
    


    //var today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() ));

    
    //let cdatewtime=current.getFullYear()+'-'+ current.getMonth() +'-'+ current.getDate();
    //let compareone =vacatedate-current;
    //console.log(`The difference is: ${compareone}`)
}

