var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/ContractBridgeDB";

module.exports.saveCards = (arrData, winRound, firstDireciton, status) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        if (err) throw (err);
        console.log("Database connected!");
        var dbo = db.db("contractBridge_DB");
ContractBridgeDB
        let myquery = { "_id": status.game_match };
        let newvalues = { $set: { [`record_card.${status.game_round}`]: [...arrData, `${winRound}_${firstDireciton}`] } };
        dbo.collection("card").updateOne(myquery, newvalues, (err) => {
            if (err) throw err;
            console.log("Update record_card completed");
        });

        //update first_direction & game_round
        let myqueryStatus = { "_id": status.game_match };
        let newvaluesStatus = { $set: { 'game_round': (status.game_round)+ 1, 'first_direction': firstDireciton } };
        dbo.collection("status").updateOne( myqueryStatus, newvaluesStatus, (err) => {
            if (err) throw err;
            console.log("Update status completed");
            db.close();
        });
    });
}
