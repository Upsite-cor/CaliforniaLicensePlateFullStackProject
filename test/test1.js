//inserts data into my mongoDB


const { MongoClient } = require("mongodb");
const {getSpecificationLabels, populateCarLabel, giveCarItems} = require("../js/scrapeHtml");
var fs = require('fs');                                                                                                                               
const url = "mongodb+srv://Upsite:Quichua20@cluster0.0ttaw6y.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);
const dbName = "LPnodes";  // Reference the database to use
var specifications;
var carSubItems;
var carAnsItems;

 async function run(_carDocument) {
    try {
         await client.connect();
         const db = client.db(dbName);
         const col = db.collection("License");
         carDoc = _carDocument;
         console.log(carDoc);
        const p = await col.insertOne(carDoc); //inserts into database ;)

         /*
         // Find and return the document
         const filter = { "General.Make": "Toyota" };
         const document = await col.findOne(filter);
         console.log("Document found:\n" + JSON.stringify(document));
         */

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

function processData(licensePlate){
  fs.readFile('/Users/bryan/Documents/seniorProj/webDraft2/LicensePlateLookup/js/output.txt', 'utf8', function(error, data){
    if(error){
       console.log(error);
    }
    specifications = getSpecificationLabels(data);
    carSubItems = populateCarLabel(data);
    carAnsItems = giveCarItems(data);
 })
 
 //setTimeout bc the function was running at the same time before the three vars above could get data
 setTimeout(() => {                                                                                       
     let carDocument = {licensePlate};
     carDocument = createSpecificationObject (carDocument, specifications);
     carDocuemnt = finalizeCarDoc(carDocument, specifications, carSubItems);
     console.log(carDocument);
     //run(carDocument).catch(console.dir);
 },1000) 
}



function createSpecificationObject (carDocument, specifications){
   for(var i = 0; i < specifications.length; i++){
      carDocument[specifications[i]] = {};
   }
   return carDocument;
   
}

function finalizeCarDoc(carDocument, specifications, carSubItems){
   var k = 0; //this will help us traverse the ansItemsArray
   for (let i = 0; i < specifications.length; i++) {
      const group = specifications[i];
      const groupSpecifications = carSubItems[i];
      let groupObject = {};

      for (let j = 0; j < groupSpecifications.length; j++) {
        const specification = groupSpecifications[j];
        groupObject[specification] = carAnsItems[k++]; // Set initial value to null
      }
      carDocument[group] = groupObject;
    }
    return carDocument;

}

module.exports = {processData};