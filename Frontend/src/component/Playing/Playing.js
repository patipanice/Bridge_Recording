import React, { useState, useEffect } from "react";
import axios from 'axios';
import Fieldcard from "./Fieldcards";
import SelectRound from './SelectRound'

export default function Playing() {

  const [cardsData, setCardsData] = useState({
    '_id': 1,
    'game_rounds': 1,
    'game_matchs': 1,
    'recording': [
      ['Back', 'Back', 'Back', 'Back', 'Back'], ['Back', 'Back', 'Back', 'Back', 'Back'],
      ['Back', 'Back', 'Back', 'Back', 'Back'], ['Back', 'Back', 'Back', 'Back', 'Back'],
      ['Back', 'Back', 'Back', 'Back', 'Back'], ['Back', 'Back', 'Back', 'Back', 'Back'],
      ['Back', 'Back', 'Back', 'Back', 'Back'], ['Back', 'Back', 'Back', 'Back', 'Back'],
      ['Back', 'Back', 'Back', 'Back', 'Back'], ['Back', 'Back', 'Back', 'Back', 'Back'],
      ['Back', 'Back', 'Back', 'Back', 'Back'], ['Back', 'Back', 'Back', 'Back', 'Back'],
      ['Back', 'Back', 'Back', 'Back', 'Back'],['Back', 'Back', 'Back', 'Back', 'Back']],
    'first_play': 'South',
    'trump': "0"
  });
  const [round, setRound] = useState(0);

  useEffect(() => {
    getAllCard();
  }, []);

  const getAllCard = async () => {
    await axios.get('http://localhost:4000/cards').then((res) => {
      if (res.status === 200) {
        console.log("GET STATUS : " + res.status + " OK.");
        const allCard = res.data[0];
        setCardsData(allCard)
      }
    });
  }

  function onChangeRound(round) {
    setRound(round);
  }

  return (
    <>
      <SelectRound onChangeRound={onChangeRound} />
      <Fieldcard round={round} cardsData={cardsData} />
    </>
  );
}
