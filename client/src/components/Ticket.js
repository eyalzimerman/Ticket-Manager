import React from "react";
import Label from "./Label";

export default function Ticket({ ticket }) {
  //   console.log(typeof ticket.creationTime);
  return (
    <div className="ticket">
      <div className="title">{ticket.title}</div>
      <div className="content">{ticket.content}</div>
      <div className="ticket-footer">
        By <span>{ticket.userEmail}</span> |{" "}
        <span>{new Date(ticket.creationTime).toDateString()}</span>{" "}
        <div className="labels">
          {ticket.labels.map((label, i) => (
            <Label key={`Label-${i}`} label={label} />
          ))}
        </div>
      </div>
      <hr />
    </div>
  );
}
