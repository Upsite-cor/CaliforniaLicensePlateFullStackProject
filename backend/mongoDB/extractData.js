 

const { MongoClient } = require("mongodb");

const url = "mongodb+srv://Upsite:211712347opol@cluster0.0ttaw6y.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);
const dbName = "LPnodes"; 


async function run(LPnum) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("License");
        const options = {
            projection: { _id: 0}
          };
         const filter = { "licensePlate": `${LPnum}` };
         const updateAge = {$set: {"age":"old"}};
         const result = await col.updateOne(filter, updateAge);
         const document = await col.findOne(filter, options);
         var doc = JSON.stringify(document);
        } catch (err) {
            console.log(err.stack);
            
     }
 
     finally {
        await client.close();
        return doc;
    }
}



async function checkForLicense(LPnum){
    return await run(LPnum);
}

module.exports = {checkForLicense};
