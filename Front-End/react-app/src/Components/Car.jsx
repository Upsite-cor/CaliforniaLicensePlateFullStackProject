import { useEffect, useState } from "react";

/*
 *  TODO:
    1. Extract key names from each entity
    2. extract values from each key
    3. Display the key names as buttons that are clickable
    4. Once a certain button is clicked make sure to prompt out the correct car information
 * 
 */


//extracted this from my component because
//this method will be created once.
const getCars = async () => {
    const response = await fetch("http://localhost:3000/api/cars");
    var resData = await response.json();
    return JSON.parse(resData);
  };

export default function Car() {
  const [carObj, setCarObj] = useState([]);
  //const [carKeys, setCarKeys] = useState([]);
  var carEntityTitle = [];



  //Fetches api once 
  useEffect(() => {
    getCars().then(setCarObj)
  }, []);

    //gets the keys from the entities
    for(var key in carObj){
        carEntityTitle.push(key);
    }

  
    console.log("CarEntityTitle: ", carEntityTitle);



  return (<h1>Data</h1>
  
  
  );
}
