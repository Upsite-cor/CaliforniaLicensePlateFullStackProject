//MOST LIKELY WILL BE USING THIS FOR MY PROJECT
const path = require('path');
const cors = require('cors');
const express = require('express');
const router = express.Router();
const {main:findData} = require('../backend/js/main')
const app = express(); //creates applicaiton
var carDescription;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));




//all is a method, and it accepts a request obj
//1. route
//2. callback to run if the route is requested

//This accepts all http request on any route hence the *

app.use(express.static('/Users/bryan/Documents/seniorProj/webDraft5/LicensePlateLookup/Front-End'))
app.use(express.static('/Users/bryan/Documents/seniorProj/webDraft5/LicensePlateLookup/loadingScreen'))
app.use(express.static('/Users/bryan/Documents/seniorProj/webDraft5/LicensePlateLookup/displayData'))
//app.use(express.static('/Users/bryan/Documents/seniorProj/webDraft5/LicensePlateLookup/backend'));
app.all('/', (req,res) =>{
    //express handles the headers the basic headers
    var index_path = "/Users/bryan/Documents/seniorProj/webDraft5/LicensePlateLookup/Front-End/index.html"
    console.log(path.join(index_path))
    res.sendFile(path.join(index_path))
})

//This will load around 15 seconds all around if not in the mongo data base
//If it is in the mongoData base then it should take around 2 second load.
//load data later should redirect into either a data not found which sends them back 
//to the home page
//OR a data found which sends them to a page where the data is all tehre.
app.all('/loadData', (req,res)=>{
    var pathdata = "/Users/bryan/Documents/seniorProj/webDraft5/LicensePlateLookup/loadingScreen/loadingScreen.html"
    res.sendFile(path.join(pathdata));
})

/*
app.all('/displayData', (req,res)=>{
    var displayDataPath  = "/Users/bryan/Documents/seniorProj/webDraft5/LicensePlateLookup/displayData/displayData.html";
    res.sendFile(path.join(displayDataPath));

})
*/





var cars = router.get('/api',(req,res)=>{
    res.json(carDescription);
})

app.use('/api/cars', cars)



app.post('/upload', async (req,res)=>{
    console.log(req.body.Lnumber);
    var licenseNumber = req.body.Lnumber;
    carDescription =  await findCar(licenseNumber);
    console.log('app.post starting to look for carDescription: ', carDescription)
    //this returns a true of false statement
    //If there is a value that is true then the vehicle is found
    //if it is a false then the vehicles is no where to be found
})

async function findCar(licenseNumber){
    var data;
    data = await findData(licenseNumber);
        if(data == false){
            return 'data not found';
        }
        else if(data !=null){
            return data;
        }

}


app.listen(4000);
console.log("The server is listening on port 4000");

module.exports = router;