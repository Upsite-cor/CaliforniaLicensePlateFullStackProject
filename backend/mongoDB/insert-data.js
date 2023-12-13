


const { MongoClient } = require("mongodb");
const {getSpecificationLabels, populateCarLabel, giveCarItems, ifCarExist} = require("../js/scrapeHtml");
var fs = require('fs');                                                                                                                               
const url = "mongodb+srv://Upsite:211712347opol@cluster0.0ttaw6y.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);
const dbName = "LPnodes";  
var specifications;
var carSubItems;
var carAnsItems;

 async function run(_carDocument) {
    try {
         await client.connect();
         const db = client.db(dbName);
         const col = db.collection("License");
         carDoc = _carDocument;
         //console.log(carDoc);
        const p = await col.insertOne(carDoc); 
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
         console.log('close mongoDB client');
        await client.close();
    }
}







function createSpecificationObject (carDocument, specifications){
   for(var i = 0; i < specifications.length; i++){
      carDocument[specifications[i]] = {};
   }
   

   return carDocument;
   
}

function finalizeCarDoc(carDocument, specifications, carSubItems, carAnsItems){
   var k = 0;
   for (let i = 0; i < specifications.length; i++) {
      const group = specifications[i];
      const groupSpecifications = carSubItems[i];
      let groupObject = {};

      for (let j = 0; j < groupSpecifications.length; j++) {
        const specification = groupSpecifications[j];
        groupObject[specification] = carAnsItems[k++];
      }
      carDocument[group] = groupObject;
    }
    carDocument["age"]="new"
    return carDocument;

}



async function processData(licensePlate){
   fs.readFile('/Users/bryan/Documents/seniorProj/webDraft2/LicensePlateLookup/js/output.txt', 'utf8', function(error, data){
     if(error){
        console.log(error);
     }
     specifications = getSpecificationLabels(data); 
     carSubItems = populateCarLabel(data);
     carAnsItems = giveCarItems(data);
  })
  
  await new Promise(resolve => setTimeout(resolve, 1000));


                                                                                    
      let carDocument = {licensePlate};
      carDocument = createSpecificationObject (carDocument, specifications);
      carDocument = finalizeCarDoc(carDocument, specifications, carSubItems, carAnsItems);
      run(carDocument).catch(console.dir);
      return carDocument; 

 }
 

module.exports = {processData};