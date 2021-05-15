import React from "react";

export default function Rowmatch(props) {
  const { history } = props;

  return (
    <div>
      {history._id}
      {history.date}
      {history.time}
      {history.trump}
      {history.win}
    </div>
  );
}
