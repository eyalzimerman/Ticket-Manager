import React from "react";
import Ticket from "./Ticket";

export default function TicketList({ allTickets }) {
  return (
    <div className="ticket-list">
      {allTickets.map((ticket, i) => (
        <Ticket key={`Ticket-${i}`} ticket={ticket} />
      ))}
    </div>
  );
}
