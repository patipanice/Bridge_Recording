import React, { useState } from "react";
import WinAuctionTrump from "./trump/WinAuctionTrump";
import "./Fieldcards.css";
const cardJson = require("../../cards.json");

export default function Fieldcard(props) {
  const { status, cardsData, round } = props;
  //var winRound = cardsData['recording'][round][4].substr(4, 7); //GET WINROUND
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
      <p className="direction win-direction">
        {/* {cardsData["record_card"][round][4]} */}
      </p>
      {
        <img
          src={
            cardJson[
              cardsData["record_card"]
                ? cardsData["record_card"][round][0]
                : "Back"
            ]
          }
          className="card south-card"
          alt="south-card"
        />
      }
      {
        <img
          src={
            cardJson[
              cardsData["record_card"]
                ? cardsData["record_card"][round][1]
                : "Back"
            ]
          }
          className="card west-card"
          alt="west-card"
        />
      }
      {
        <img
          src={
            cardJson[
              cardsData["record_card"]
                ? cardsData["record_card"][round][2]
                : "Back"
            ]
          }
          className="card north-card"
          alt="north-card"
        />
      }
      {
        <img
          src={
            cardJson[
              cardsData["record_card"]
                ? cardsData["record_card"][round][3]
                : "Back"
            ]
          }
          className="card east-card"
          alt="east-card"
        />
      }
      {
        <img
          src={
            cardJson[
              cardsData["record_card"]
                ? cardsData["record_card"][round][4].substr(0, 3)
                : ""
            ]
          }
          className="winround-card"
        />
      }

      {trumpPopUp}
      {status["trump"] === "None" ? (
        <button className="btn-trump" onClick={popUpTrumpOpenHandler}>
          Trump
        </button>
      ) : (
        <h1 className="trump_state">
          <img
            src={cardJson[status["trump"].charAt(0)]}
            alt="trump"
            className="trump-img"
          />
          / {status["trump"].charAt(1)}
        </h1>
      )}
    </>
  );
}
