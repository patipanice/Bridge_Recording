import React, { useState } from "react";
import Rowmatch from "./Rowmatch";
import "./History.css";
export default function History() {
  const history = [
    {
      _id: 1,
      date: "17/12/40",
      time: "14:02",
      trump: "H1",
      win: "South",
    },
    {
      _id: 2,
      date: "15/06/40",
      time: "7:49",
      trump: "H2",
      win: "North",
    },
    {
      _id: 2,
      date: "15/06/40",
      time: "7:49",
      trump: "H2",
      win: "North",
    },
  ];
  const historyElements = history.map((history, index) => {
    return <Rowmatch key={index} history={history} />;
  });

  return (
    <div>
      <div className="main-center">
        <div className="history-content">
          <h2>History</h2>
          <table>
            <tr>
              <td>No.1</td>
              <td>Date</td>
              <td>Start Time</td>
              <td>End Time </td>
              <td>Status</td>
            </tr>
            <tr></tr>
          </table>
        </div>
      </div>
    </div>
  );
}
