//I can say why using the wget is better than using puppeteers wget to get html files. 
//Because wget comes with a more organized html file making it easier to search through.



const {initateSearch} = require ('./lookupPlate.js');
const {cmd: fetchHtml} = require ('./execMethod.js');
const {processData} = require('../mongoDB/insert-data.js');
const {checkForLicense}=require('../mongoDB/extractData.js');
var fs = require('fs');
//9DXP329          
var LPnumber;


main('9DXP329');

function main(num){
    LPnumber = num;
    var license = check();
    return license.then(dataFoundinDB, dataNotFoundinDB);
}


//var license = check();

async function check() {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await checkForLicense(LPnumber);

            if (result === 'null') {
                reject('DataNotFound');
            } else {
                resolve(result);
            }
        } catch (error) {
            console.error(error);
            reject(error); // Reject with the error
        }
    });

}

//todo: if there is no license plate in the database start the scraper search. If there is no license plate in the scraper search
// ask the user to input deatils of the car or just notfiy em.



//license.then(dataFoundinDB, dataNotFoundinDB);

function dataFoundinDB(data){
    console.log(data); // we found the data in mongoDB
    return data;
}

async function dataNotFoundinDB(){
    var data = await start();
    console.log('searching data process done: ', data)
    return data; //starts scraping

}

/*
NOTES:
//The error is around here
//We want to process the data only if our output.txt contains html data.
//If there is a 404 error it doesn't write.
// one idea is that we should use a string to store in our html instead of scraping the txt
// either or should anyways have fun!

*/
async function start(){


        console.log('initating the webscraping search')
        await initateSearch(LPnumber);
        console.log('headless browser done')
        console.log('finding htmltxt')
        
        await createCommand(getHtml, LPnumber); // we need this to promise that after the command is done then we run process data.
        console.log('htmlTxtFound')
        console.log('checking if car exist...')
        await new Promise(resolve => setTimeout(resolve, 8000));
        carExist =  checkIfCarExist(); //using await function because i want the rest of my program to compile syncrousnusly.
        console.log('car exist: ', carExist);
        if(!carExist){
            console.log('program finished')
            return false;
        }
        else{
            return await processData(LPnumber); //inserts data into mongoDB
            
        }

        /*
        setTimeout(() => {
            carExist =  checkIfCarExist(); //using await function because i want the rest of my program to compile syncrousnusly.
            console.log('car exist: ', carExist);
            if(!carExist){
                console.log('program finished')
                return false;
            }
            else{
                return  processData(LPnumber);
                
            }
        }, 8000)*/
       

     
        
        
        async function createCommand(callback, LPnumber){
                try{
                    var command = `wget -O /Users/bryan/Documents/seniorProj/webDraft2/LicensePlateLookup/js/output.txt https://www.lookupaplate.com/california/${LPnumber}/`;
                    callback(command)
                }
                catch(err){
                    console.log(err);
                }
        }
        async function getHtml(command){
            
            fetchHtml(command);
        }
    

}

 function checkIfCarExist(){
    var flag;
    var data
    data = fs.readFileSync('/Users/bryan/Documents/seniorProj/webDraft2/LicensePlateLookup/js/output.txt', 'utf8')

    if(data.length == 0)
        flag = false
    else
        flag = true;


     console.log('flag value = ', flag);

    return flag;
}



module.exports = {main};
