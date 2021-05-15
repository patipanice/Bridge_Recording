var express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const editarrData = require("./editarrData");
const {resultRound} = require("./resultRound");
var { getStatus, updateStatus, insertCard, getCard } = require("./connectMongo");
var {createFile} = require('./logFile')
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
var port = process.env.PORT || 5000;

var arrData = []; //recive 4 cards form arduino
var gameStatus = {
  game_match: 1,
  game_round: 1,
  trump: "None",
  first_direction: "South",
};

createFile();
//Get status form Mongo
const getStatusHandler = () => {
  getStatus().then((res) => {
    gameStatus = {
      game_match: res.game_match,
      game_round: res.game_round,
      trump: res.trump,
      first_direction: res.first_direction,
    };
    if (gameStatus.game_round === 13) {
      let myqueryStatus = { _id: gameStatus.game_match };
      let newvaluesStatus = { $set: { game_match: gameStatus.game_match + 1 } };
      updateStatus(myqueryStatus, newvaluesStatus)
        .then(console.log("Update status success"))
        .catch((err) => console.log(err));
    }
  });
};

app.listen(port, () => {
  console.log("[success] : listening on port " + port);
  getStatusHandler();
});

app.get("/", (req, res) => {
  res.status(200).send("first page of api express");
});

//get data form arduino
app.get("/write/:data", (req, res) => {
  data = req.params.data;
  if (gameStatus.trump === "None") {
    console.log("You must to Auction before go to playing state.");
    return res.send(
      "You placing " +
        data +
        "  You must to auction before go to playing state !!"
    );
  } else {
    res.send("You placing " + data);
    console.log("You placing " + data);
    arrData.push(data);
    if (arrData.length === 4) {
      console.log("[Card_Data] : " + arrData);
      arrData = editarrData(arrData, gameStatus.first_direction);
      let [winRound, first_direciton] = resultRound(arrData);
      console.log(
        "WinRound : " + winRound + " First_Direction : " + first_direciton
      );
      //saveCards.saveCards(arrData, winRound, first_direciton, gameStatus);
      let myquery = { _id: gameStatus.game_match };
      let newvalues = {
        $set: {
          [`record_card.${gameStatus.game_round}`]: [
            ...arrData,
            `${winRound}_${first_direciton}`,
          ],
        },
      }; 
      insertCard(gameStatus, arrData, myquery, newvalues)
        .then((res,err) => {
          if (err) throw err;
          console.log("Update record_card completed");
        })
        .then(() => {
          //update status when finish round
          let myqueryStatus = { _id: gameStatus.game_match };
          let newvaluesStatus = {
            $set: {
              game_round: gameStatus.game_round + 1,
              first_direction: first_direciton,
            },
          };
          updateStatus(myqueryStatus, newvaluesStatus).then((res,err) => {
            if (err) throw err;
            console.log("ีีUpdate status completed");
            arrData = []; //reset
            getStatusHandler();
          });
        });
    }
  }
});

//post status form front
app.post("/poststatus", (req, res) => {
  let trump = req.body.trump;
  let first_direction = req.body.first_direction;
  let mySQL = { _id: gameStatus.game_match };
  let newSQL = { $set: { trump: trump, first_direction: first_direction },};
  updateStatus(mySQL,newSQL).then(err=>{
      if(err) throw(err)
      arrData = []
      console.log("Update status complete");
  })
});
//get card api
app.get("/card", (req, res) => {
  readCard(res);
});

//get status api
app.get("/status", (req, res) => {
  readStatus(res);
});

//read card 
async function readCard(res) {
  await getCard().then(response=>{
    response.toArray((err,docs)=>{
        if(err) throw(err)
            res.json(docs);
            console.log("Read card passed");
        });
  });
}

//read status
async function readStatus(res) {
   await getStatus().then(response=>{ 
      res.json(response);
      console.log("Read status passed");
  });
}
