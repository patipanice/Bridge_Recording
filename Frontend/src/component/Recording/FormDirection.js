import React from 'react'
import './FomrDirection.css'
export default function FormDirection(props) {
    const changeDirection = (event) => {
        props.onChangeDirecion(event.target.value);
    }

    return (
        <form >
            <label>Select Direction : </label>
            <select name="direction" id="direction" onChange={changeDirection} className="option-direciton">
                <option value="South">South</option>
                <option value="West">West</option>
                <option value="North">North</option>
                <option value="East">East</option>
            </select>
        </form>
    )
}
