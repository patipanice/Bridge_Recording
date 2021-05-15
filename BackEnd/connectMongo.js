var MongoClient = require("mongodb").MongoClient;

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
  connectMongo.then(db =>{
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(CARD).find({});
  });



const updateStatus = (query, newquery) =>
  connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(STATUS).updateOne(query, newquery);
  });

  const createStatus = () => {
    
  }

const insertCard = (status,arrData,myquery,newvalues) =>
  connectMongo.then((db) => {
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection("card").updateOne(myquery, newvalues);
  });

module.exports = {
  getStatus,
  updateStatus,
  insertCard,
  getCard
};
