const {MongoClient} = require("mongodb")
const url = "mongodb+srv://Upsite:211712347opol@cluster0.0ttaw6y.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);
const dbName = "LPnodes";
const express = require('express') ;

const carRouter = require('./carRouter/cars')

const app = express();
var doc; //documents


startApiServer()
async function run(){
  try{

    await client.connect();
    console.log("DATABASE CONNECTED")
    const db = client.db(dbName);
    const col = db.collection("License");
    const option = {
      projection: {_id:0} // I added this to not show the ID in the database
    };

    doc = await col.find({}, option).toArray();
    //console.log("Print all docs in 'License collection: ");
    //console.log(doc);
    


  }catch(err){
    console.log(err.stack)
  }finally{
    await client.close()
    return doc;
  }


}


async function startApiServer(){
  doc = await run();
    
  
  app.listen(1234, async ()=>{
  console.log('Server started at port: 1234');
  })

  



}




