import React from "react";
import Ticket from "./Ticket";
import "../styles/TicketList.css";

export default function TicketList({
  allTickets,
  setHiddenTicketCounter,
  hiddenTicketCounter,
  setAllHiddenTickets,
  allHiddenTickets,
  setBlurWhenLoading,
  setClassNameSpinner,
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
            setAllHiddenTickets={setAllHiddenTickets}
            allHiddenTickets={allHiddenTickets}
            setClassNameSpinner={setClassNameSpinner}
            setBlurWhenLoading={setBlurWhenLoading}
            ticketCondition={ticket.done}
          />
        ))}
    </div>
  );
}
