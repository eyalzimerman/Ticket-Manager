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

  // All States
  const [allTickets, setAllTickets] = useState([]);
  const [hiddenTicketCounter, setHiddenTicketCounter] = useState();

  useEffect(() => {
    axios
      .get("/api/tickets")
      .then((result) => {
        result.data.forEach((ticket) => {
          ticket.hidden = false;
        });
        setAllTickets(result.data);
      })
      .catch((e) => {
        console.log(e.name);
      });
  }, []);

  // Function to get tickets by search
  const getTicketBySearchText = (e) => {
    const inputValue = e.target.value;
    axios
      .get(`/api/tickets?searchText=${inputValue}`)
      .then((result) => {
        if (result.data.length > 0) {
          setAllTickets(result.data);
        } else {
          setAllTickets([]);
        }
      })
      .catch((e) => {
        console.log(e.name);
      });
  };

  // Function to restore all hidden tickets
  const restoreAllTickets = () => {
    allTickets.forEach((ticket) => {
      ticket.hidden = false;
    });
    setHiddenTicketCounter();
    setAllTickets(allTickets.slice());
  };

  return (
    <div className="search-area">
      <h1>Ticket Manager</h1>

      <input
        id="searchInput"
        className="input"
        type="text"
        placeholder="Search for ticket..."
        onChange={getTicketBySearchText}
      />
      <div id="hideTicketsCounter">{hiddenTicketCounter} </div>
      {hiddenTicketCounter && (
        <span id="restoreHideTickets" onClick={restoreAllTickets}>
          Restore
        </span>
      )}
      <div className="labels-container">
        {labels.map((label, i) => (
          <span key={`label-${i}`}> {label} </span>
        ))}
      </div>
      <TicketList
        allTickets={allTickets}
        setHiddenTicketCounter={setHiddenTicketCounter}
        hiddenTicketCounter={hiddenTicketCounter}
        setAllTickets={setAllTickets}
        allTickets={allTickets}
      />
    </div>
  );
}
