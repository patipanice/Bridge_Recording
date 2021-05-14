import React, { useState, useEffect } from "react";
import axios from 'axios';
import Fieldcard from "./Fieldcards";
import SelectRound from './SelectRound'

export default function Playing() {

  const [cardsData, setCardsData] = useState([]);
  //const [card,setCard] = useState([]);
  const [round, setRound] = useState(0);

  useEffect(() => {
    getAllCard().then(res=>{
      if(res.status == '200'){
        console.log("[ Get status : 200 OK ! ]");
        setCardsData(res.data)
      }
    });
    
  }, []);

  const getAllCard = async () => {
    const rawCard =  await axios.get('http://localhost:5000/card/');
    return rawCard;
  }

  function onChangeRound(round) {
    setRound(round);
  }

  return (
    <>
    {)}
    {cardsData.map(card=> <h1>{card._id} {card.record_card}</h1>)}
    {/* <SelectRound onChangeRound={onChangeRound} />
      <Fieldcard round={round} cardsData={cardsData} />*/}
    </>
  );
}
