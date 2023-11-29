import { useEffect, useState } from "react";

/*
 *  ISSUES:
    NONE
    

    CONTINUTE:
    1. Add click events into the buttons. Once a user clicks an event data should appear.
    2. watch this video for this: https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/39649204#overview
 * 
 */


//extracted this from my component because
//this method will be created once.
const getCars = async () => {
    const response = await fetch("http://localhost:3000/api/cars");
    var resData = await response.json();
    return JSON.parse(resData);
  };


//checks if an array is empty.
const isEmpty = (obj) => {

  if(obj === undefined){
    return true;
  }

  if(obj.length === 0){
    return true;
  }
  else{
    return false;
  }
}


const  getEntity= (carObj) => {
  var carEntityTitle = [];
  if(isEmpty(carObj)){
    return;
  }else{
        //gets the keys from the entities
        for(var key in carObj){
          carEntityTitle.push(key);
      }
      //console.log("CarEntityTitle: ", carEntityTitle);
      return carEntityTitle;
  }
}


const getKeys = (carObj) => {
  var keys = [];
  //console.log("this is the getKeys function: ", keyObj);
  if(isEmpty(carObj)){
    return;
  }
  else{
    for(var key in carObj){
      keys.push(carObj[key]);
    }
    //console.log("carKeys: ", keys);
    return keys;
  }

}

//Get the nested key names;
const getNestedKeys = (carObj) => {
  var nestedKey = [];
  if(isEmpty(carObj)){
    return;
  }else{
    for(var i = 0; i < carObj.length; i++){
      nestedKey.push(getEntity(carObj[i]))
    }
    //keyValue.shift();
    //console.log("nested key values: ",  nestedKey);
    return nestedKey;
  }
}

//get nested keyValues
const getNestedKeyValues = (carObj) => {
  var nestedKeyValue = [];
  if(isEmpty(carObj)){
    return;
  }else{

    for(var i = 0; i < carObj.length; i++){
      nestedKeyValue.push(getKeys(carObj[i]));
    }
    //nestedKeyValue.shift();
    //console.log("nestedKeyValue: ", nestedKeyValue);
    return nestedKeyValue;
  }

}


const printObj = (Obj) => {
  console.log(Obj);
}


//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////Components are below and above are functions in javascript///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

const EntityTitle = ({entitys, carLicense, carLicenseValue, nestedCarKey, nestedCarKeyValues}) => {
  if (!Array.isArray(entitys) || entitys.length === 0) {
    // Render a loading state or a message indicating data is loading
    return <div>Loading...</div>;
  }

  return (
    <>
      {entitys.map(enTitle => (
        <button key={enTitle}>{enTitle}</button>
      ))}
    </>
  );
};






// export default function Car() {
//   const [carObj, setCarObj] = useState([]);
  
//   /*
//   const [carEntityTitleState, setCarEntityTitleState] = useState([]);
//   const [carKeyState, setCarKeyState] = useState([]);
//   const [nestedCarKeyState, setNestedCarKeyState] = useState([]);
//   const [nestedCarKeyValuesState, setNestedCarKeyValuesState] = useState([]);
//   const [carLicenseState, setCarLicenseState] = useState([]);
//   const [carLicenseValueState, setCarLicenseValueState] = useState([]);
//   */

//   //const [carKeys, setCarKeys] = useState([]);
//   var carEntityTitle = [];
//   var carKey = [];
//   var nestedCarKey = [];
//   var nestedCarKeyValues = [];
//   var carLicense;
//   var carLicenseValue;

//   //Fetches api once 
//   useEffect(() => {
//     getCars().then((setCarObj))
//   }, [])
//   //to display an array of values make sure to use the useState if you want to use it in the component
//   try{
//         carEntityTitle = getEntity(carObj); //gets entity title
//         carLicense = carEntityTitle.shift();
//         carEntityTitle.pop();
//         carKey = getKeys(carObj); //gets the obj key
//         carKey.pop();
//         carLicenseValue = carKey.shift();
//         nestedCarKey = getNestedKeys(carKey); //gets the nested entity
//         nestedCarKeyValues = getNestedKeyValues(carKey);
//         //setCarEntityTitleState(carEntityTitle);
        
//         /*
//         setCarKeyState(carKey);
//         setNestedCarKeyState(nestedCarKey);
//         setNestedCarKeyValuesState(nestedCarKeyValues);
//         setCarLicenseState(carLicense);
//         setCarLicenseValueState(carLicenseValue);
//         */
    
//         printObj(carEntityTitle);
//         printObj(carKey);
//         printObj(nestedCarKey);
//         printObj(nestedCarKeyValues);
//         printObj(carLicense);
//         printObj(carLicenseValue);
   
  
 
//   }
//   catch(err){
//     console.log(err);
//   }
 

//   return (
  
//   <div>  
//   <h1>Data</h1>
//   {/*carEntityTitleState.length === 0 ? <p></p> : <EntityTitle entitys={carEntityTitleState}/>*/}
//   </div>

  
//   );
// }



// 


export default function Car() {
  const [carEntityTitleState, setCarEntityTitleState] = useState([]);
  //const [carKeyState, setCarKeyState] = useState([]);
  const [nestedCarKeyState, setNestedCarKeyState] = useState([]);
  const [nestedCarKeyValuesState, setNestedCarKeyValuesState] = useState([]);
  const [carLicenseState, setCarLicenseState] = useState([]);
  const [carLicenseValueState, setCarLicenseValueState] = useState([]);

  // ... other state variables

  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCars(); // Fetch the car data
        
        // Data manipulation
        const carEntityTitle = getEntity(data);
        const carLicense = carEntityTitle?.shift();
        carEntityTitle?.pop();
        const carKey = getKeys(data);
        carKey?.pop();
        const carLicenseValue = carKey?.shift();
        const nestedCarKey = getNestedKeys(carKey);
        const nestedCarKeyValues = getNestedKeyValues(carKey);


        // Update state variables
        setCarEntityTitleState(carEntityTitle || []);
        //setCarKeyState(carKey || []);
        setNestedCarKeyState(nestedCarKey || []);
        setNestedCarKeyValuesState(nestedCarKeyValues || []);
        setCarLicenseState(carLicense||'');
        setCarLicenseValueState(carLicenseValue || '');

        // Perform operations or set states as needed
        // printObj(carEntityTitle);
        // printObj(carLicense);
        // printObj(carKey);
        // printObj(carLicenseValue);
        // printObj(nestedCarKey);
        // printObj(nestedCarKeyValues);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); // Invoke the function to fetch and process data
  }, []);



  return (
    
      <div>
        <h1>Data</h1>
        <EntityTitle 
        entitys={carEntityTitleState}
        carLicense={carLicenseState}
        carLicenseValue={carLicenseValueState}
        nestedCarKey={nestedCarKeyState}
        nestedCarKeyValues={nestedCarKeyValuesState}
        />
      </div>
  
  );
}


