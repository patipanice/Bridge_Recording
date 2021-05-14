var express = require("express");
var MongoClient = require('mongodb').MongoClient;
var saveCards = require("./saveDataToMango");
var cors = require("cors");
const bodyParser = require("body-parser");
const editarrData = require('./editarrData');
const resultRound = require('./resultRound');
const Promise = require('promise')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/ContractBridgeDB";
 
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
var port = process.env.PORT || 5000;

var arrData = [] //recive 4 cards form arduino 

var gameStatus = {
    game_match: 1,
    game_round: 1,
    trump: "None",
    first_direction: "South"
}

app.listen(port, () => {
    console.log("[success] : listening on port " + port);
    function connectMongoDB() {
        return new Promise(function (fulfill, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                if (err) reject(err);
                else {
                    console.log("Database connected")
                    var dbo = db.db("ContractBridgeDB");
                    dbo.collection("status").findOne({}, (err, result) => {
                        if (err) reject(err);
                        else {
                            fulfill(result);
                        }
                    });
                }
            });
        });
    }
    connectMongoDB().then(res => {
        gameStatus = {
            game_match: res.game_match,
            game_round: res.game_round,
            trump: res.trump,
            first_direction: res.first_direction
        }
        //when game_round = 13 -> game_match =+ 1 
        if(gameStatus.game_round === 13) {
            let myqueryStatus = { '_id': gameStatus.game_match };
            let newvaluesStatus = { $set: { 'game_match': gameStatus.game_match + 1} };
            dbo.collection("status").updateOne( myqueryStatus, newvaluesStatus, (err) => {
                if (err) throw err;
                console.log("Update game_match completed");
                db.close();
            });
        }
    });
});

app.get("/", (req, res) => {
    res.status(200).send("หน้าแรกของ api express");
});
//get data form arduino 
app.get('/write/:data', (req, res) => {
    data = req.params.data;
    console.log("No. " + (arrData.length + 1) + " : " + data);
    if (gameStatus.trump === "None") {
        console.log("You must to auction before go to playing state.");
        return res.send("You placing " + data + " !! You must to auction before go to playing state !!");
    } else {
        res.send("You placing " + data);
        arrData.push(data);
        if (arrData.length == 4) {
            console.log("arrData = " + arrData);
            arrData = editarrData(arrData, gameStatus.first_direction);
            let [winRound, first_direciton] = resultRound(arrData);
            console.log("WinRound : " + winRound + " First_Direction : " + first_direciton);
            saveCards.saveCards(arrData, winRound, first_direciton, gameStatus);
        }
    }
});
//post status form front
app.post('/poststatus', (req,res) => {
   let trump = req.body.trump;
   let first_direction = req.body.first_direction;
   MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw(err);
    else {
        console.log("Database connected")
        var dbo = db.db("ContractBridgeDB");
        let mySQL = {_id : gameStatus.game_match};
        let newSQL = {$set :{'trump' : trump , 'first_direction' : first_direction}};
        dbo.collection("status").updateOne(mySQL,newSQL, (err) => {
            if (err) throw(err);
            console.log("Update postStatus completed");
            res.send("Update postStatus completed");
        });
    }
});
});
//get card 
app.get('/card', (req,res) => {
    readCard(res);
});
//get status
app.get('/status', (req,res) => {
    readStatus(res);
});

/** Function read data  */

async function readCard (res){
    await readCardMongo(res);
}

const readCardMongo = (res) => {
    return new Promise((resolve,reject)=> {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw(err);
        else {
            console.log("Database connected")
            var dbo = db.db("ContractBridgeDB");
            dbo.collection("card").find({}).toArray((err,docs) => {
                if (err) throw(err);
                //const obj = Object.assign({}, docs);
                res.json(docs)
                console.log("Read card form mongo");
                db.close();
            });    
        }
    });
    });
}

async function readStatus (res){
    await readStatusMongo(res);
}

const readStatusMongo = (res) => {
    return new Promise((resolve,reject)=> {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw(err);
        else {
            console.log("Database connected")
            var dbo = db.db("ContractBridgeDB");
            dbo.collection("status").find({}).toArray((err,docs) => {
                if (err) throw(err);
                res.json(docs)
                console.log("Read status form mongo");
                db.close();
            });
        }
    });
    });
}