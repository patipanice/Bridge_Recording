import React from "react";

export default function update(prop) {
  const { inputTime } = prop;
  let date = new Date(inputTime);
  let today = date.toLocaleString();
  let time = today.substr(11);

  return (
    <div>
      <td>{time}</td>
    </div>
  );
}
