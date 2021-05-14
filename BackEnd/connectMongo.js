var MongoClient = require("mongodb").MongoClient;

const URL = "mongodb://localhost:27017/ContractBridgeDB";
const STATUS = 'status';

//Connect MongoDB
const connectMongo = MongoClient.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const getStatus = connectMongo.then(db => {
    let dbo = db.db("ContractBridgeDB");
     return dbo.collection(STATUS).findOne({});
  });

const updateStatus = (query,newquery) => connectMongo.then(db=>{
    let dbo = db.db("ContractBridgeDB");
    return dbo.collection(STATUS).updateOne(query,newquery);
})


module.exports = {
    getStatus,
    updateStatus
};
