import React from "react";

export default function update(prop) {
  const { inputDate } = prop;
  let date = new Date(inputDate);
  let today = date.toLocaleString();
  let day = today.substr(0, 9);

  return <div>{day}</div>;
}
