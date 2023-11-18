import { useState} from 'react';


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


/*
async function FetchAPI(){
    await fetch('http://192.168.0.31:3000/api/cars')
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
*/


/*
async function FetchAPI() {
    try {
      const response = await fetch('http://localhost:3000/api/cars');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const car = await response.json();
      return JSON.parse(car);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
*/




function MainTitle(props) {


    return (


        <h1>{props.children}</h1>


    )
}

function EntityTitle({ children, onSelect }) {
    //when returning a component make sure you are only returning a single
    // parent element so like a div a section or a fragment
    // <></> == fragement <div></div> == div and so on the example below
    // is an appropriate way to return html
    //carInfo is undefined still



    //console.log("You are in Entity Title", props.carInfo);



    return (
        //className allows us to name our html class.
        <>
            <button className="entityButton" onClick={onSelect}><h3>{children}</h3></button>
        </>




    );


}

//never use try catch or async and await in react

/*
async function catchInfo(){
    carInfo = await FetchAPI();
    //console.log(carInfo);
}
*/

function GetCarInfo() {
    const [selectedTopic, setSelectedTopic] = useState('Please click a button');
    const [info, setInfo] = useState([])
    var arrTitle = [];
    var obj;


    async function fetchInfo() {
        const response = await fetch('http://192.168.0.31:3000/api/cars');
        var resData = await response.json();
        obj = JSON.parse(resData);
        for (var key in obj) {
            arrTitle.push(key);
        }
        setInfo(arrTitle);
    }

    //can I setinfo(arrTitle) here the reason is because i'm assuming im fetching over and over too many time
    // so its making my stuff rerender too many times as my setSelectedTopic updates



    function handleClick(selectedButton) {
        setSelectedTopic(selectedButton);
        console.log(selectedTopic)
        for (var key in carInfo) {
            console.log(key);
        }
    }


    fetchInfo();

    console.log(info);
    return (
        <div>
            {info.map((title) => {
                return <div key={title}><EntityTitle onSelect={() => handleClick("you've pressed" + {title})}>{title}</EntityTitle></div>
            })}
            <p>{selectedTopic}</p>
        </div>
    )
}



export default function Cars() {


    //const [selectedTopic, setSelectedTopic] = useState('Please click a button');

    /*
    function handleClick(selectedButton) {
        setSelectedTopic(selectedButton);
        console.log(selectedTopic)
        for (var key in carInfo) {
            console.log(key);
        }
    }
    */






    return (
        <div>
            <main>
                <MainTitle>data</MainTitle>
                <GetCarInfo />
            </main>
        </div>


    )


}

//TODO:
/*
    1. Figure out how to take out keys from a json file in JS. We are going to use those keys to display data into our buttons 
    2.console.log(carInfo.general[Make]); does it work like this?
*/