import React from "react";
import Label from "./Label";
import "../styles/Ticket.css";

export default function Ticket({
  ticket,
  setHiddenTicketCounter,
  hiddenTicketCounter,
  allHiddenTickets,
  setAllHiddenTickets,
}) {
  // Function to hide specific ticket
  const hide = () => {
    ticket.hidden = true;
    setHiddenTicketCounter(hiddenTicketCounter ? hiddenTicketCounter + 1 : 1);
    const temp = allHiddenTickets;
    temp.push(ticket);
    setAllHiddenTickets(temp);
  };

  return (
    <div className={ticket.hidden ? "hide-ticket" : "ticket"}>
      <button className="hideTicketButton" onClick={hide}>
        Hide
      </button>
      <div className="title">{ticket.title}</div>
      <div className="content">{ticket.content}</div>
      <div className="ticket-footer">
        <div className="ticket-footer-content">
          By <span>{ticket.userEmail}</span> |{" "}
          <span>{new Date(ticket.creationTime).toDateString()}</span>{" "}
        </div>
        <div className="labels">
          {ticket.labels &&
            ticket.labels.map((label, i) => (
              <Label key={`Label-${i}`} label={label} />
            ))}
        </div>
      </div>
    </div>
  );
}
