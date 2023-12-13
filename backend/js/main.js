


const {initateSearch} = require ('./lookupPlate.js');
const {cmd: fetchHtml} = require ('./execMethod.js');
const {processData} = require('../mongoDB/insert-data.js');
const {checkForLicense}=require('../mongoDB/extractData.js');
var fs = require('fs');


var LPnumber;




function main(num){
    LPnumber = num;
    var license = check();
    return license.then(dataFoundinDB, dataNotFoundinDB);
}




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



function dataFoundinDB(data){
    console.log(data); 
    return data;
}

async function dataNotFoundinDB(){
    var data = await start();
    console.log('searching data process done: ', data)
    return data; //starts scraping

}



async function start(){


        console.log('initating the webscraping search')
        await initateSearch(LPnumber);
        console.log('headless browser done')
        console.log('finding htmltxt')
        
        await createCommand(getHtml, LPnumber); 
        console.log('htmlTxtFound')
        console.log('checking if car exist...')
        await new Promise(resolve => setTimeout(resolve, 8000));
        carExist =  checkIfCarExist(); 
        console.log('car exist: ', carExist);
        if(!carExist){
            console.log('program finished')
            return false;
        }
        else{
            return await processData(LPnumber);
            
        }


       

     
        
        
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
