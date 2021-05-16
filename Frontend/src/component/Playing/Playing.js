import React, { useState, useEffect } from "react";
import axios from "axios";
import Fieldcard from "./Fieldcards";
import SelectRound from "./SelectRound";
import SelectMatch from "./SelectMatch";

export default function Playing() {
  const [cardsData, setCardsData] = useState([
    {
      _id: 1,
      record_card: [
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
        ["Back", "Back", "Back", "Back", "Back"],
      ],
    },
  ]);
  const [status, setStatus] = useState(
    {
      _id: 1,
      game_match: 1,
      trump: "None",
      game_round: 1,
      first_direction: "South",
    },
    {
      _id: 2,
      game_match: 1,
      trump: "None",
      game_round: 1,
      first_direction: "South",
    },
    {
      _id: 3,
      game_match: 1,
      trump: "None",
      game_round: 1,
      first_direction: "South",
    }
  );
  const [round, setRound] = useState(0);
  const [match, setMatch] = useState(0);

  useEffect(() => {
    getAllCard().then((res) => {
      if (res.status == "200") {
        console.log("[ Get status server : 200 OK ! ]");
        setCardsData(res.data[match]); //when match change useEffect() will run again and again
      }
    });
    getStatus().then((res) => {
      if (res.status == "200") {
        console.log("[ Get status server : 200 OK ! ]");
        setStatus(res.data[match]); //when match change useEffect() will run again and again
        let date = new Date(res.data[0].end_date_time);
        let today = date.toLocaleString();
        let time = today.substr(11);
        let day = today.substr(0, 9);
        // console.log(day);
      }
    });
  }, [match]);

  const getAllCard = async () => {
    const rawCard = await axios.get("http://localhost:5000/card/");
    return rawCard;
  };
  const getStatus = async () => {
    const rawStatus = await axios.get("http://localhost:5000/status");
    return rawStatus;
  };

  function onChangeRound(round) {
    setRound(round);
  }
  function onChangeMatch(round) {
    setMatch(round);
  }

  return (
    <>
      <SelectRound onChangeRound={onChangeRound} />
      <SelectMatch onChangeMatch={onChangeMatch} />
      <Fieldcard status={status} cardsData={cardsData} round={round} />
    </>
  );
}
