//MOST LIKELY WILL BE USING THIS FOR MY PROJECT
const path = require('path');
const cors = require('cors');
const express = require('express');
const {main:findData} = require('../js/main')
const app = express(); //creates applicaiton
var carDescription;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));




//all is a method, and it accepts a request obj
//1. route
//2. callback to run if the route is requested

//This accepts all http request on any route hence the *

app.use(express.static('/Users/bryan/Documents/seniorProj/webDraft5/LicensePlateLookup/frontend/home_page'))

app.all('/', (req,res) =>{
    //express handles the headers the basic headers
    var index_path = "/Users/bryan/Documents/seniorProj/webDraft5/LicensePlateLookup/frontend/home_page/index.html"
    console.log(path.join(index_path))
    res.sendFile(path.join(index_path))
})


app.get('/api/cars',(req,res)=>{
    res.json(carDescription);
})


app.get('/errorImage', (req, res) => {
    const imagePath = path.join(__dirname, '../images/crying_emoji.png'); // Replace with the actual path to your image
    res.sendFile(imagePath);
  });
  
  app.get('/searchingImage', (req, res) => {
    const imagePath = path.join(__dirname, '../images/searching_emoji.png'); // Replace with the actual path to your image
    res.sendFile(imagePath);
  });

  app.get('/happyImage', (req, res) => {
    const imagePath = path.join(__dirname, '../images/Happy_emoji.png'); // Replace with the actual path to your image
    res.sendFile(imagePath);
  });


app.post('/upload', async (req,res)=>{
    console.log(req.body.Lnumber);
    var licenseNumber = req.body.Lnumber;
    carDescription =  await findCar(licenseNumber);
    console.log('app.post starting to look for carDescription: ', carDescription)

    if(carDescription != 'data not found'){
        console.log("status 200")
        res.status(200).send({found:true, carDescription});
    }
    else{
        console.log("status 400")
        res.status(400).send({found:false});
    }
    //this returns a true of false statement
    //If there is a value that is true then the vehicle is found
    //if it is a false then the vehicles is no where to be found
})


async function findCar(licenseNumber){
    var data;
    data = await findData(licenseNumber); //goes to the function called main in main.js just the alias is findData
        //console.log(data);
        if(data == false){
            return 'data not found';
        }
        else if(data !=null){
            return data;
        }

}


app.listen(3000);
console.log("The server is listening on port 3000");