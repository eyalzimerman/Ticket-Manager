import React from "react";
import Label from "./Label";
import "../styles/Ticket.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Ticket({
  ticket,
  setHiddenTicketCounter,
  hiddenTicketCounter,
  allHiddenTickets,
  setAllHiddenTickets,
  ticketCondition,
}) {
  // Function to hide specific ticket
  const hide = () => {
    ticket.hidden = true;
    setHiddenTicketCounter(hiddenTicketCounter ? hiddenTicketCounter + 1 : 1);
    const temp = allHiddenTickets;
    temp.push(ticket);
    setAllHiddenTickets(temp);
  };

  // States
  const [isDone, setIsDone] = useState(<i className="fas fa-check"></i>);
  const [condition, setCondition] = useState("");
  const [conditionClass, setConditionClass] = useState("");

  useEffect(() => {
    if (ticketCondition) {
      setIsDone(<i className="fas fa-times"></i>);
    } else {
      setIsDone(<i className="fas fa-check"></i>);
    }
  }, []);

  // Function for done or Undone ticket
  const doneUndone = async () => {
    if (isDone.props.className === "fas fa-check") {
      try {
        await axios.patch(`/api/tickets/${ticket._id}/done`);
        setCondition("saved!");
        setConditionClass("condition");
        setIsDone(<i className="fas fa-times"></i>);
      } catch (e) {
        setCondition("Failed!");
        setConditionClass("condition");
        setIsDone(<i className="fas fa-check"></i>);
      }
      setTimeout(() => {
        setCondition("");
        setConditionClass("");
      }, 4000);
    } else {
      try {
        await axios.patch(`/api/tickets/${ticket._id}/undone`);
        setCondition("saved!");
        setConditionClass("condition");
        setIsDone(<i className="fas fa-check"></i>);
      } catch (e) {
        setCondition("Failed!");
        setConditionClass("condition");
        setIsDone(<i className="fas fa-times"></i>);
      }
      setTimeout(() => {
        setCondition("");
        setConditionClass("");
      }, 4000);
    }
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
        <div className="done-undone-div">
          <span className={conditionClass}>{condition}</span>
          <span className="done-undone-btn" onClick={doneUndone}>
            {isDone}
          </span>
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
