import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import TicketList from "./TicketList";
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
  const [filterLabels, setFilterLabels] = useState([]);
  const [allHiddenTickets, setAllHiddenTickets] = useState([]);
  const [tempText, setTempText] = useState("");
  const [nowClicked, setNowClicked] = useState([]);
  const [classNameSpinner, setClassNameSpinner] = useState("spinner-div");
  const [blurWhenLoading, setBlurWhenLoading] = useState("main");

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
        console.log(e.message);
      });
  }, []);

  // Function to get tickets by search
  const getTicketBySearchText = async (e) => {
    const inputValue = e.target.value;
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
      console.log(e.message);
    }
  };

  useEffect(() => {
    for (let i = 0; i < nowClicked.length - 1; i++) {
      nowClicked[i].classList.toggle("clicked");
    }
    nowClicked.splice(0, nowClicked.length - 1);
  }, [nowClicked]);

  // Function for get ticket by clicking label text
  const getTicketByClickingLabelText = (e) => {
    const inputValue = e.target.innerText;
    nowClicked.push(e.target);
    setNowClicked(nowClicked.slice());
    e.target.classList.toggle("clicked");
    let ticketsByLabel = [];
    if (filterLabels.includes(inputValue)) {
      setFilterLabels([]);
      setAllTickets(originalTickets);
    } else {
      filterLabels.push(inputValue);
      originalTickets.forEach((ticket) => {
        if (ticket.labels.includes(inputValue)) {
          ticketsByLabel.push(ticket);
        }
        setAllTickets(ticketsByLabel);
      });
      setFilterLabels(filterLabels.slice());
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

  return (
    <div className="search-area">
      <h1>Ticket Manager</h1>
      <div className="scroll-btn" onClick={scrollUp}>
        <i className="fas fa-chevron-up"></i>
      </div>
      <input
        id="searchInput"
        className="input"
        type="text"
        placeholder="Search for ticket..."
        onChange={getTicketBySearchText}
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
            className="label-search-area"
            onClick={getTicketByClickingLabelText}
            key={`label-${i}`}
          >
            {label}
          </span>
        ))}
      </div>
      <div className={blurWhenLoading}>
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
