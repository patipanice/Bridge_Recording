import React from 'react'
import './SelectRound.css'
export default function SelectMatch(props) {

    const changeMatch = (event) =>{
        props.onChangeMatch(event.target.value);
    }

    return (
              <form >
                <label>Select Match : </label>
                <select name="match" id="match" onChange={changeMatch} className="option-matches">
                    <option value="0">Begin</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                </select>
            </form>
    )
}
