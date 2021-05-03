const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('promise');
const cors = require('cors');
const mongojs = require('mongojs')
const mydb = mongojs('ContractBridgeDB');
const app = express();
var port = 4000;

var data;
var arrData = []; //Keep card data.
var newarrData = [];
var game_match, game_round, trump, first_play, Win, Max, directionPlayer, indexWin;
var trumpS, first_playS;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, function () {
  var nodeStartTime = new Date();
  console.log('My protocol running on port ' + port + ' start at ' + nodeStartTime);
  getRoundMatchMongo();
});

//Get Round and Match to update game round
const getRoundMatchMongo = async () => {
  var mywritecollection = await mydb.collection('Recording');
  mywritecollection.find({}).sort({ _id: -1 }).limit(1, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      arrData = []; //re-state 
      [game_round, game_match, trump, first_play] = [result[0].game_rounds, result[0].game_matchs, result[0].trump, result[0].first_play];
      console.log("Game-round : " + game_round + " Game-match : " + game_match + " Trump : " + trump + " first_play : " + first_play); //print Game Round & Game Match & Trump
    }
  });
}


app.get('/', function (req, res) {
  res.send("Hello Server!");
});

app.get('/cards', function (req, res) {
  readdata(50, res);
});

app.get('/trumps', function (req, res) {
  readtrumps(10, res);
});

app.get('/result', function (req, res) {
  readresult(20, res);
});

app.post('/post', function (req, res) {
  trumpS = req.body.trump;
  first_playS = req.body.first_play;
  console.log(trumpS);
  console.log(first_playS);
  writeTrump(trumpS, first_playS, res);
});

//Get data from Arduino
app.get('/write/:data', function (req, res) {
  data = req.params.data;
  console.log(data);
  if (trump == 0) {
    console.log("Auction before going to playing state");
    return res.send("You placing " + data + " !! Auction before going to playing state !!");
  } else {
    arrData.push(data);
    res.send("You placing " + data);
    if (arrData.length == 4) {
      console.log("Data = " + arrData + ", Length = " + arrData.length);
      editArrData();
      resultRound();
    }
  }
});

const editArrData = () => {
  if (first_play == "South") {
    console.log("editArrData = South"); // South
    newarrData[0] = arrData[0];
    newarrData[1] = arrData[1];
    newarrData[2] = arrData[2];
    newarrData[3] = arrData[3];
  }
  else if (first_play == "West") { // West
    console.log("editArrData = West");
    newarrData[0] = arrData[1];
    newarrData[1] = arrData[2];
    newarrData[2] = arrData[3];
    newarrData[3] = arrData[0];
  } else if (first_play == "North") { // North
    console.log("editArrData = North");
    newarrData[0] = arrData[2];
    newarrData[1] = arrData[3];
    newarrData[2] = arrData[0];
    newarrData[3] = arrData[1];
  } else if (first_play == "East") { // East
    console.log("editArrData = East");
    newarrData[0] = arrData[3];
    newarrData[1] = arrData[0];
    newarrData[2] = arrData[1];
    newarrData[3] = arrData[2];
  }
  arrData = newarrData;
  console.log("editArrData : " + arrData);
}

const saveGameStateToMongo = async () => {
  var myquery = { 'game_rounds': game_round };
  var mywritecollection = await mydb.collection('Playing');
  var recordingcollection = await mydb.collection('Recording');
  var newvalues = { $set: { [`recording.${game_round}`]: [...arrData, Win + "_" + directionPlayer] } }
  await mywritecollection.update(myquery, newvalues, function (err) {
    if (err) { console.log(err); } else { console.log('Push Playing Recording Passed'); }
  });

  var setValues = {
    $set: {
      [`recording.${directionPlayer}.inHand.${game_round}`]: [Win],
      [`recording.${directionPlayer}.inventory.${game_round}`]: [...arrData]
    }
  }
  await recordingcollection.update(myquery, setValues, function (err) {
    if (err) { console.log(err); } else { console.log('Push Recording Recording Passed'); }
  });

  await mywritecollection.updateOne(myquery, { $set: { 'game_rounds': game_round + 1, 'first_play': directionPlayer } }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Set Round and firstPlay Playing pass")
    }
  });

  await recordingcollection.updateOne(myquery, { $set: { 'game_rounds': game_round + 1, 'first_play': directionPlayer } }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Set Round and firstPlay Recording pass");
      getRoundMatchMongo();
    }
  });
}

async function writeTrump(_trump, _firstplay, res) {
  await writeTrumpToMongo(_trump, _firstplay, res);
}

function writeTrumpToMongo(_trump, _firstplay, res) {
  return new Promise(function (resolve, reject) {
    var myPlayingcollection = mydb.collection('Playing');
    var myRecordingcollection = mydb.collection('Recording');
    const mySQL = { "_id": game_match };
    const setValues = {
      $set: {
        'trump': _trump,
        'first_play': _firstplay
      }
    }
    myPlayingcollection.update(mySQL, setValues, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Record trump to Playing ok');
      }
    });
    myRecordingcollection.update(mySQL, setValues, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Record trump to Recording ok');
      }
    });
  });
}

async function readdata(_datasize, res) {
  await readDataFromMongo(_datasize, res);
}

function readDataFromMongo(_readdatasize, res) {
  return new Promise(function (resolve, reject) {
    var myreadcollection = mydb.collection('Playing');
    myreadcollection.find({}).limit(Number(_readdatasize)).sort({ recordTime: -1 }, function (err, docs) {
      res.jsonp(docs.reverse());
    });
  });
}

async function readtrumps(_datasize, res) {
  await readTrumpsFromMongo(_datasize, res);
}

function readTrumpsFromMongo(_readdatasize, res) {
  return new Promise(function (resolve, reject) {
    var myreadcollection = mydb.collection('Trump');
    myreadcollection.find({}).limit(Number(_readdatasize)).sort({ recordTime: -1 }, function (err, docs) {
      res.jsonp(docs.reverse());
    });
  });
}

async function readresult(_datasize, res) {
  await readResultFromMongo(_datasize, res);
}

function readResultFromMongo(_readdatasize, res) {
  return new Promise(function (resolve, reject) {
    var myreadcollection = mydb.collection('Recording');
    myreadcollection.find({}).limit(Number(_readdatasize)).sort({ recordTime: -1 }, function (err, docs) {
      res.jsonp(docs.reverse());
    });
  });
}

//********************************************* คำนวนไพ่ และ ชนะรอบ ************************************//
function resultRound() {
  console.log("Resulting round state........ ");
  var first = arrData[0].charAt(0);
  //กรณีหน้าเดียวกันทั้งหมด parseInt => str>int , substring(from,to);
  if (first == arrData[1].charAt(0) && first == arrData[2].charAt(0) && first == arrData[3].charAt(0)) {
    //หาค่าที่มากสุด
    const arrNum = arrData.map(data => parseInt(data.substring(1, 3)));
    Max = Math.max(...arrNum);
    Win = arrData.filter(arr => arr.substring(1, 3) == Max).toString();
    indexWin = arrData.indexOf(Win); //หาว่าอยู่ตัวที่เท่าไหร่ใน arrData 
  } else { //กรณีไม่ใช่หน้าเดียวกัน ให้คิดจากทรัมป์ 
    [Win, indexWin] = find_Max(); //destructure return 2 value form function
  }
  changeDirection(indexWin);
  console.log("Win_round : " + Win + ", At Index : " + indexWin);
  saveGameStateToMongo();
}



//ฟังก์ชั่นหาค่ามากสุดกรณีมีทรัมป์ ทุกรูปแบบ
const find_Max = () => {
  const _find = arrData.filter(arr => arr.charAt(0) == trump);
  if (_find.length == 1) {
    Win = _find.toString();
    indexWin = arrData.indexOf(Win);
  } else {
    console.log("if length > 1");
    const arrNum = _find.map(data => parseInt(data.substring(1, 3)));
    Max = Math.max(...arrNum);
    Win = arrData.filter(arr => arr.substring(1, 3) == Max).toString();
    indexWin = arrData.indexOf(Win);
  }
  return [Win, indexWin];
}


//********************************* ฟังกชั่นเปลี่ยนค่า win_index -> ทิศผู้เล่นที่เริ่มก่อน *******************************//
const changeDirection = (num) => {
  if (num == 0) {
    directionPlayer = "South";
    console.log(directionPlayer);
  }
  else if (num == 1) {
    directionPlayer = "West";
    console.log(directionPlayer);
  }
  else if (num == 2) {
    directionPlayer = "North";
    console.log(directionPlayer);
  }
  else if (num == 3) {
    directionPlayer = "East";
    console.log(directionPlayer);
  }
}

