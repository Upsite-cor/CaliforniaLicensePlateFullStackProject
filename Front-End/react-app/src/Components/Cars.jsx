var carInfo;
function FetchAPI(){
    fetch('http://localhost:3000/api/cars')
    .then(response => response.json())
    .then(car =>{
        console.log(car);
    })
    .catch(error => console.log(error));





}


export default function Cars(){
    //I would reccomened a try catch here so no error appears

    //Okay there is two options you can take
    //1. Do parallel programming to ensure fast speed
    //2. make sure all your data is in that single API however, this risk for data leak
    FetchAPI();
    
    
    return (
        <h1>HELLO!</h1>
    )
}