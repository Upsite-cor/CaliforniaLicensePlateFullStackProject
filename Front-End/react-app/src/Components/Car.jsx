import { useEffect, useState } from "react";

//extracted this from my component because
//this method will be created once.
const getCars = async () => {
    const response = await fetch("http://localhost:3000/api/cars");
    var resData = await response.json();
    return resData;
  };

export default function Car() {
  const [carObj, setCarObj] = useState([]);
  useEffect(() => {
    getCars().then(setCarObj)
  }, []);
  console.log(carObj);
  return (<h1>Data</h1>
        
  
  
  
  
  
  );
}
