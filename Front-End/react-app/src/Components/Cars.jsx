import { useState } from 'react';


var carInfo;


/*
async function FetchAPI(){
    fetch('http://localhost:3000/api/cars')
    .then(response => response.json())
    .then(car =>{
        //car is intialiting a string
        //creates an object
        carInfo = JSON.parse(car); 
        console.log(typeof carInfo);
        //console.log(car);
        return carInfo;
    })
    .catch(error => {console.log(error); return null})




}
*/

//it does work just fetch is an async code so, you'll see carInfo be undefined because the rest of the code is runnning.
function FetchAPI(){
    fetch('http://192.168.0.31:3000/api/cars')
    .then(response => response.json())
    .then(car =>{
        //car is intialiting a string
        //creates an object
        carInfo = JSON.parse(car); 
        console.log(typeof carInfo);
        //console.log(carInfo);
        //console.log(car);
        return carInfo;
    })
    .catch(error => {console.log(error); return null})




}





function MainTitle(props){


    return(

    
        <h1>{props.children}</h1>
        

    )
}

function EntityTitle({children, onSelect}){
    //when returning a component make sure you are only returning a single
    // parent element so like a div a section or a fragment
    // <></> == fragement <div></div> == div and so on the example below
    // is an appropriate way to return html
    //carInfo is undefined still



    //console.log("You are in Entity Title", props.carInfo);
    
    
    
    return(
        <>
        <button onClick = {onSelect}><h3>{children}</h3></button>
        </>




    );


}

//never use try catch or async and await in react

export default function Cars(){
    
    //useStates are considered hooks alr so to set your variable you use setSelectedTopic to help with this
    const [selectedTopic, setSelectedTopic] = useState('Please click a button'); //this must be called on the top of the function never nested 
    function handleClick(selectedButton){
        //selectedButton = "general", "Battery"
        // selectedbutton can be one of those
        setSelectedTopic(selectedButton);
        console.log(selectedTopic)
    } 
    
    //when calling handClick on onClick dont show parameters like handleClick()
    //I would reccomened a try catch here so no error appears
    //Okay there is two options you can take

    //1. Do parallel programming to ensure fast speed
    //2. make sure all your data is in that single API however, this risk for data leak
    carInfo = FetchAPI();
    //entityTitle();
    //object = {carInfo} //carInfo is a json object 

    return (
        <div>
            <main>
            <MainTitle>data</MainTitle>
            
            <ul>
            <EntityTitle /*onSelect will also be passed into EntityTitle*/onSelect={() => handleClick('General Stuff')}/* This allows us to pass data into the parameters */>
                General    
            </EntityTitle>

            <EntityTitle /*onSelect will also be passed into EntityTitle*/onSelect={() => handleClick('Battery')}/* This allows us to pass data into the parameters */>
                Battery    
            </EntityTitle>
            </ul>
            <p>{selectedTopic}</p>
            <div id="car-content">
                <h3></h3>
                <p></p>
                <pre>
                    <code>

                    </code>
                </pre>
            </div>
            </main>
        </div>


    )

 
}

//TODO:
/*
    Finish watching the udemy to come up with ideas
    then figure out axios and async/await to use in this program
*/