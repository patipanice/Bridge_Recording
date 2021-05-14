import React, { useState } from "react";
import "./WinAuctionTrump.css";
import axios from 'axios';
export default function Trump(props) {
  const { onTrumpClose } = props;
  const [input, setInput] = useState({
    winTrump: "",
    Trump: "",
  });

  const onSubmit = e => {
    if (input['Trump'].length === 0 || input['winTrump'].length === 0) {
      alert("Plese select all option below to play the game !!");
    } else {
      axios.post('http://localhost:5000/poststatus', {
        trump: input['Trump'], first_direction: input['winTrump']
      }).then((res) => {
        console.log(res.status);
        if (res.status == "200") {
          alert("Set Play first and Trump complete !");
          onTrumpClose();
        }
      });
    }

  }

  const handleChange = e => {
    const { target } = e;
    const { name } = target;
    const value = target.value;
    setInput({
      ...input,
      [name]: value,
    });
  };


  return (
    <div className="content-trump">
      <div className="content-trump-popup-bg" >
        <div className="content-trump-popup-use" >
          <form>
            <h1 className="headder-trump">Select Win Auction Trump</h1>
            <div className="first_play">
              <input
                type="radio"
                value="North"
                name="winTrump"
                onChange={handleChange}
              />
              <label>North</label>
              <input
                type="radio"
                value="East"
                name="winTrump"
                onChange={handleChange}
              />
              <label>East</label>
              <input
                type="radio"
                value="South"
                name="winTrump"
                onChange={handleChange}
              />
              <label>South</label>
              <input
                type="radio"
                value="West"
                name="winTrump"
                onChange={handleChange}
              />
              <label>West</label>
            </div>

            <h1 className="headder-trump">Select Trump</h1>
            <div className="select_trump">
              <div className="radio">
                1 &nbsp;
              <label>
                  <input
                    type="radio"
                    value="C1"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconC.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="A1"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconD.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="H1"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconH.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="S1"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconS.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="NT1"
                    name="Trump"
                    onChange={handleChange}
                  />
                &nbsp; NT
              </label>
              </div>
              {/* ///////////////////////2//////////////////////////////////// */}
              <div className="radio">
                2 &nbsp;
              <label>
                  <input
                    type="radio"
                    value="C2"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconC.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="A2"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconD.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="H2"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconH.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="S2"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconS.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="NT2"
                    name="Trump"
                    onChange={handleChange}
                  />
                &nbsp; NT
              </label>
              </div>
              <div className="radio">
                3 &nbsp;
              <label>
                  <input
                    type="radio"
                    value="C3"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconC.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="A3"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconD.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="H3"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconH.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="S3"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconS.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="NT3"
                    name="Trump"
                    onChange={handleChange}
                  />
                &nbsp; NT
              </label>
              </div>
              {/* ///////////////////////4//////////////////////////////////// */}
              <div className="radio">
                4 &nbsp;
              <label>
                  <input
                    type="radio"
                    value="C4"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconC.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="A4"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconD.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="H4"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconH.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="S4"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconS.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="NT4"
                    name="Trump"
                    onChange={handleChange}
                  />
                &nbsp; NT
              </label>
              </div>
              {/* //////////////////////5//////////////////////////////// */}
              <div className="radio">
                5 &nbsp;
              <label>
                  <input
                    type="radio"
                    value="C5"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconC.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="A5"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconD.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="H5"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconH.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="S5"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconS.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="NT5"
                    name="Trump"
                    onChange={handleChange}
                  />
                &nbsp; NT
              </label>
              </div>
              {/* ///////////////////////6//////////////////////////////////// */}
              <div className="radio">
                6 &nbsp;
              <label>
                  <input
                    type="radio"
                    value="C6"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconC.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="A6"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconD.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="H6"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconH.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="S6"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconS.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="NT6"
                    name="Trump"
                    onChange={handleChange}
                  />
                &nbsp; NT
              </label>
              </div>
              {/* //////////////////////7//////////////////////////////// */}
              <div className="radio">
                7 &nbsp;
              <label>
                  <input
                    type="radio"
                    value="C7"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconC.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="A7"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconD.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="H7"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconH.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="S7"
                    name="Trump"
                    onChange={handleChange}
                  />
                  <img src="/images/IconS.png" /> &nbsp;
              </label>
                <label>
                  <input
                    type="radio"
                    value="NT7"
                    name="Trump"
                    onChange={handleChange}
                  />
                &nbsp; NT
              </label>
              </div>
            </div>
            <button type="submit" onClick={onSubmit}>
              Submit
            </button>
            <button onClick={onTrumpClose}>
              Cancle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
