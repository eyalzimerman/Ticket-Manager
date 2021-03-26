import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import TicketList from "./TicketList";
import Form from "./Form";
import "../styles/SearchArea.css";

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
  const [originalTickets, setOriginalTickets] = useState([]);
  const [filterLabels, setFilterLabels] = useState();
  const [allHiddenTickets, setAllHiddenTickets] = useState([]);
  const [tempText, setTempText] = useState("");
  const [classNameSpinner, setClassNameSpinner] = useState("spinner-div");
  const [blurWhenLoading, setBlurWhenLoading] = useState("main");
  const [hideForm, setHideForm] = useState(true);
  const [formMessage, setFormMessage] = useState("");
  const [classFormMessage, setClassFormMessage] = useState("");

  useEffect(() => {
    setClassNameSpinner("loader");
    setBlurWhenLoading("blur");
    axios
      .get("/api/tickets")
      .then((result) => {
        result.data.forEach((ticket) => {
          ticket.hidden = false;
        });
        setOriginalTickets(result.data);
        setAllTickets(result.data);
        setClassNameSpinner("spinner-div");
        setBlurWhenLoading("main");
      })
      .catch((e) => {
        setClassNameSpinner("spinner-div");
        setBlurWhenLoading("main");
      });
  }, []);

  // Function to get tickets by search
  const getTicketBySearchText = async (target) => {
    const inputValue = target.value;
    setTempText(inputValue);
    try {
      setClassNameSpinner("loader");
      setBlurWhenLoading("blur");
      const result = await axios.get(`/api/tickets?searchText=${inputValue}`);
      let tempTicket = [];
      result.data.forEach((newTicket) => {
        let bool = true;
        allHiddenTickets.forEach((hideTicket) => {
          if (hideTicket.content === newTicket.content) {
            bool = false;
          }
        });
        if (bool) {
          tempTicket.push(newTicket);
        }
      });
      setClassNameSpinner("spinner-div");
      setBlurWhenLoading("main");
      setAllTickets(tempTicket);
    } catch (e) {
      setClassNameSpinner("spinner-div");
      setBlurWhenLoading("main");
    }
  };

  // Function for get ticket by clicking label text
  const getTicketByClickingLabelText = (e) => {
    const inputValue = e.target.innerText;
    let ticketsByLabel = [];
    if (inputValue === filterLabels) {
      setAllTickets(originalTickets);
      setFilterLabels();
    } else {
      setFilterLabels(inputValue);
      originalTickets.forEach((ticket) => {
        if (ticket.labels.includes(inputValue)) {
          ticketsByLabel.push(ticket);
        }
        setAllTickets(ticketsByLabel);
      });
    }
  };

  // Function to restore all hidden tickets
  const restoreAllTickets = () => {
    const ticketsToDisplay = originalTickets.filter((ticket) => {
      ticket.hidden = false;
      return ticket.title.toLowerCase().includes(tempText.toLowerCase());
    });
    setHiddenTicketCounter();
    setAllTickets(ticketsToDisplay);
    setAllHiddenTickets([]);
  };

  // Function to scroll up window
  const scrollUp = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  // Function to add new ticket to ticket List
  const addNewTicket = (e) => {
    const form = e.target;
    e.preventDefault();
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
      if (key === "labels") {
        data[key] = data[key] ? data[key].concat(value) : [value];
      } else {
        data[key] = value;
      }
    }
    setClassNameSpinner("loader");
    setBlurWhenLoading("blur");
    axios
      .post("/api/tickets/new", data)
      .then((res) => {
        setFormMessage("Saved Ticket!");
        setClassFormMessage("message");
        setClassNameSpinner("spinner-div");
        setBlurWhenLoading("main");
        const searchInput = document.querySelector("#searchInput");
        getTicketBySearchText(searchInput);
        setTimeout(() => {
          setFormMessage("");
          setClassFormMessage("");
        }, 4000);
      })
      .catch((e) => {
        setClassFormMessage("message");
        setFormMessage("Failed To Saved Ticket!");
        setClassNameSpinner("spinner-div");
        setBlurWhenLoading("main");
        setTimeout(() => {
          setFormMessage("");
          setClassFormMessage("");
        }, 4000);
      });
    setHideForm(!hideForm);
    form.reset();
  };

  return (
    <div className="search-area">
      <h1>Ticket Manager</h1>
      <div className={classFormMessage}>{formMessage}</div>
      <div className="scroll-btn" onClick={scrollUp}>
        <i className="fas fa-chevron-up"></i>
      </div>
      <div className="add-ticket" onClick={() => setHideForm(!hideForm)}>
        <i className="fas fa-plus"></i>
      </div>
      <input
        id="searchInput"
        className="input"
        type="text"
        placeholder="Search for ticket..."
        onChange={(e) => {
          getTicketBySearchText(e.target);
        }}
      />
      <div className="restore-div">
        <div id="hideTicketsCounter">{hiddenTicketCounter} </div>
        {hiddenTicketCounter && (
          <span>
            {" "}
            {hiddenTicketCounter > 1
              ? "Hidden Tickets"
              : "Hidden Ticket"} -{" "}
            <span
              className="restore-btn"
              id="restoreHideTickets"
              onClick={restoreAllTickets}
            >
              Restore
            </span>
          </span>
        )}
      </div>
      <div className={classNameSpinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="labels-container">
        {labels.map((label, i) => (
          <span
            className={`label-search-area ${
              filterLabels !== label ? "" : "clicked"
            }`}
            onClick={getTicketByClickingLabelText}
            key={`label-${i}`}
          >
            {label}
          </span>
        ))}
      </div>
      <div className={blurWhenLoading}>
        {allTickets.length === 0 && (
          <div className="not-found-message">
            No Results Found... <i className="fas fa-search"></i>
          </div>
        )}
        <Form
          hideForm={hideForm}
          addNewTicket={addNewTicket}
          setHideForm={setHideForm}
        />
        <TicketList
          allTickets={allTickets}
          setHiddenTicketCounter={setHiddenTicketCounter}
          hiddenTicketCounter={hiddenTicketCounter}
          allTickets={allTickets}
          allHiddenTickets={allHiddenTickets}
          setAllHiddenTickets={setAllHiddenTickets}
        />
      </div>
    </div>
  );
}
