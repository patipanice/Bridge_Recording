var MongoClient = require("mongodb").MongoClient;
//var cardJson = require("./jsonDB/card.json");
//var statusJson =require("./jsonDB/status.json");
const URL = "mongodb://localhost:27017/ContractBridgeDB";
const STATUS = "status";
const CARD = "card";


//Connect MongoDB
const connectMongo = MongoClient.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getStatus = () =>
  connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(STATUS).find({});
  });

const getCard = () =>
  connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(CARD).find({});
  });

const updateStatus = (query, newquery) =>
  connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(STATUS).updateOne(query, newquery);
  });

<<<<<<< HEAD
  const createStatus = () => {
    
  }

const insertCard = (status,arrData,myquery,newvalues) =>
=======
const createStatus = (query) => 
  connectMongo.then(db=>{
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(STATUS).insertOne(query);
  });


/*const insertCard = (myquery, newvalues) =>
>>>>>>> 085597c5823a43ec08e8aeb07bc9028d7c191c4a
  connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection("card").updateOne(myquery, newvalues);
  });*/

  const insertCard = (myquery, newvalues) =>
  connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(CARD).updateOne(myquery, newvalues);
  });


  const resetMongoInit = async (_id) =>{
   await connectMongo.then((db) => {
      let dbo = db.db("ContractBridgeDB");
      dbo.collection(STATUS).deleteOne({'_id':_id},(err)=>{
        if(err) throw(err)
        console.log(`Delete ${_id} document completed`)
      });
    });
  }


module.exports = {
  getStatus,
  updateStatus,
  insertCard,
  getCard,
  createStatus,
  resetMongoInit
};
