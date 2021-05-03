import React from 'react'
import './inHandField.css';
const cardJson = require('../../cards.json');
export default function InHandField(props) {
    const { records, direction } = props;
    return (
        <>
            <h3 className="inHand-title">Cards in the player's {direction} hand</h3>
            <div className="inHand-flex">
                {records[direction]['inHand'].map(card => <img src={cardJson[card]} alt="inHand-cards" className="inHand-item" />)}
            </div>
        </>
    )
}
