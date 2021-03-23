import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import TicketList from "./TicketList";

export default function SearchArea() {
  const labels = [
    "Help",
    "Tech",
    "Guidelines",
    "Corvid",
    "Api",
    "Collapse",
    "Expand",
    "Problem",
    "Login",
    "Tutorial",
    "View Count",
  ];

  const [allTickets, setAllTickets] = useState([]);
  useEffect(() => {
    axios
      .get("/api/tickets")
      .then((result) => {
        setAllTickets(result.data);
      })
      .catch((e) => {
        console.log(e.name);
      });
  }, []);
  return (
    <div className="search-area">
      <h1>Ticket Manager</h1>

      <input
        className="input"
        type="text"
        placeholder="Search for ticket..."
        // onChange={changeText}
      />
      <div className="labels-container">
        {labels.map((label, i) => (
          <span key={`label-${i}`}> {label} </span>
        ))}
      </div>
      <TicketList allTickets={allTickets} />
    </div>
  );
}
