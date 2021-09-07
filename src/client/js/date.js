
//var cda= document.getElementById("button").addEventListener('click',cdates);
export function cdates(){
    let vacatedate= document.getElementById("vacationdate").value;
    console.log(vacatedate);
    let q=new Date(vacatedate);
    console.log(q);
    let d=q.getTime();
    console.log(`This is the miliseconds for the trip:${d}`);

    //console.log(vacatedate.toISOString());

    let current=new Date();
    console.log(current)
    let cd=current.getTime();
   //console.log(`This is the vacateion date: ${freedom}
    console.log(`This is the current Date(milliseconds): ${cd}`);

    let compare=d-cd;
    console.log(`This is the changes : ${compare}`);
    const m_in_7_days=604800000;

    if((compare/m_in_7_days) < 1){

        console.log("Trip start is within 7 days, curent weather data")
        return 1;
    }
    else{
        console.log("Trip start is above 7 days, forecast weather data")
        return 2;

    }
    


    //var today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() ));

    
    //let cdatewtime=current.getFullYear()+'-'+ current.getMonth() +'-'+ current.getDate();
    //let compareone =vacatedate-current;
    //console.log(`The difference is: ${compareone}`)
}


