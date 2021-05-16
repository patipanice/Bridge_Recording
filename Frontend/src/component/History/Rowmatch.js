import React, { useState } from "react";
import UpTime from "./UpTime";
import UpDate from "./UpDate";

export default function Rowmatch(props) {
  const { status } = props;
  const [count, setCount] = useState(0);
  let date_0 = new Date(status[0] && status[0].start_date_time);
  let today_0 = date_0.toLocaleString();
  let time_0 = today_0.substr(11);
  let day_0 = today_0.substr(0, 9);

  return (
    <div>
      <table>
        <tr>
          <td>No.</td>
          <td>Date</td>
          <td>Time Start</td>
          <td>Time End</td>
          <td>Status</td>
        </tr>
        <tr>
          <td>{status[0] ? status[0]._id : ""}</td>
          <td>
            <UpDate inputDate={status[0] ? status[0].start_date_time : ""} />
          </td>
          <td>
            <UpTime inputTime={status[0] ? status[0].start_date_time : ""} />
          </td>
          <td>
            <UpTime inputTime={status[0] ? status[0].end_date_time : ""} />
          </td>
          <td>Status</td>
        </tr>
        <tr>
          <td>No.</td>
          <td></td>
          <td></td>
          <td>Time End</td>
          <td>Status</td>
        </tr>
      </table>
    </div>
  );
}
