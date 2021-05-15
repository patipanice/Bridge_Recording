import React from "react";
import "./SelectRound.css";
export default function SelectRound(props) {
  const changeRound = (event) => {
    props.onChangeRound(event.target.value);
  };

  return (
    <div className="grid-select">
      <form>
        <label>Select Round : </label>
        <select
          name="rounds"
          id="rounds"
          onChange={changeRound}
          className="option-rounds"
        >
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
    </div>
  );
}
