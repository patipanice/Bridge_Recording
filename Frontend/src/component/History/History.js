import React, { useState, useEffect } from "react";
import axios from "axios";
import Rowmatch from "./Rowmatch";
import "./History.css";
export default function History() {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/status").then((result) => {
      const { data } = result;
      console.log(data);
      setStatus(data);
    });
  }, []);

  return (
    <div>
      <div className="main-center">
        <div className="history-content">
          <h2>History </h2>
          <Rowmatch status={status} />
        </div>
      </div>
    </div>
  );
}
