import React,{useState} from 'react';
import SelectRound from '../Playing/SelectRound';
import './inVentoryField.css';
const cardJson = require('../../cards.json');
export default function InVentoryField(props) {
    const { records, direction } = props;
    const [round,setRound] = useState(0);

    const onChangeRound = (round) => {
        setRound(round);
      }
      //OnChange
    return (
        
        <>
        
            <h3 className="inVentory-title">All cards received by the {direction} Player in a round of play.</h3>
            <SelectRound onChangeRound={onChangeRound}/>
            <div className="inHand-flex">
                {records[direction]['inventory'][round].map(card => <img src={cardJson[card]} alt="inHand-cards" className="inHand-item" />)}
            </div>
        </>
    )
}
