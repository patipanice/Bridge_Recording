import React, { useState } from "react";
import WinAuctionTrump from "./trump/WinAuctionTrump";
import './Fieldcards.css';
const cardJson = require('../../cards.json');

export default function Fieldcard(props) {
  const { cardsData, round } = props;
  var winRound = cardsData['recording'][round][4].substr(4, 7); //GET WINROUND
  const [popupTrump, setPopupTrump] = useState(false);
  let trumpPopUp;

  const popUpTrumpOpenHandler = () => setPopupTrump(true);
  const popUpTrumpCloseHandler = () => setPopupTrump(false);

  if (popupTrump) {
    trumpPopUp = <WinAuctionTrump onTrumpClose={popUpTrumpCloseHandler} />;
  }

  return (
    <>
      <p className="direction south-direction">South</p>
      <p className="direction west-direction">West</p>
      <p className="direction north-direction">North</p>
      <p className="direction east-direction">East</p>
      <p className="direction win-direction">{cardsData['recording'][round][4]}</p>
      {<img src={cardJson[cardsData['recording'][round][0]]} className="card south-card" alt="south-card" />}
      {<img src={cardJson[cardsData['recording'][round][1]]} className="card west-card" alt="west-card" />}
      {<img src={cardJson[cardsData['recording'][round][2]]} className="card north-card" alt="north-card" />}
      {<img src={cardJson[cardsData['recording'][round][3]]} className="card east-card" alt="east-card" />}
      {<img src={cardJson[cardsData['recording'][round][4].substr(0, 3)]} className="winround-card" />}
      {trumpPopUp}
      { (cardsData['trump'] === "0")
        ? <button className="btn-trump" onClick={popUpTrumpOpenHandler}>Trump</button>
        : <h1 className="trump_state"><img src={cardJson[cardsData['trump'].charAt(0)]} alt="trump" className="trump-img" /> / {cardsData['trump'].charAt(1)}</h1>}

    </>
  );
}
