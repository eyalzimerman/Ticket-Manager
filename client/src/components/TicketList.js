import React from "react";
import Ticket from "./Ticket";
import "../styles/TicketList.css";

export default function TicketList({
  allTickets,
  setHiddenTicketCounter,
  hiddenTicketCounter,
  setAllTickets,
}) {
  return (
    <div className="ticket-list">
      {allTickets &&
        allTickets.map((ticket, i) => (
          <Ticket
            key={`Ticket-${i}`}
            setHiddenTicketCounter={setHiddenTicketCounter}
            hiddenTicketCounter={hiddenTicketCounter}
            ticket={ticket}
            setAllTickets={setAllTickets}
            allTickets={allTickets}
          />
        ))}
    </div>
  );
}
