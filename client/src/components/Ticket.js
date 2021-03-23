import React from "react";
import Label from "./Label";
import "../styles/Ticket.css";

export default function Ticket({
  ticket,
  setHiddenTicketCounter,
  hiddenTicketCounter,
  setAllTickets,
  allTickets,
}) {
  // Function to hide specific ticket
  const hide = () => {
    ticket.hidden = true;
    setAllTickets(allTickets.slice());
    setHiddenTicketCounter(hiddenTicketCounter ? hiddenTicketCounter + 1 : 1);
  };

  return (
    <div className={ticket.hidden ? "hide-ticket" : "ticket"}>
      <button className="hideTicketButton" onClick={hide}>
        Hide
      </button>
      <div className="title">{ticket.title}</div>
      <div className="content">{ticket.content}</div>
      <div className="ticket-footer">
        By <span>{ticket.userEmail}</span> |{" "}
        <span>{new Date(ticket.creationTime).toDateString()}</span>{" "}
        <div className="labels">
          {ticket.labels &&
            ticket.labels.map((label, i) => (
              <Label key={`Label-${i}`} label={label} />
            ))}
        </div>
      </div>
      <hr />
    </div>
  );
}
