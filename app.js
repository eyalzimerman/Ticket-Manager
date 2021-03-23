const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Tickets = require("./model/tickets");

app.use(express.static("client/build"));
app.use(express.json());

// GET all tickets or by searching title text
app.get("/api/tickets/", async (req, res) => {
  try {
    let data = await Tickets.find({});
    const { searchText } = req.query;
    if (searchText) {
      data =
        data &&
        data.filter((search) => {
          return search.title.toLowerCase().includes(searchText.toLowerCase());
        });
    }

    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Problem" });
  }
});

// PATCH ticket to done by ticket id and /done route
app.patch("/api/tickets/:ticketId/done", (req, res) => {
  const { ticketId } = req.params;

  return Tickets.findByIdAndUpdate(ticketId, { done: true }, { new: true })
    .then(() => {
      res.status(200).json({ updated: true });
    })
    .catch((e) => {
      if (e.name === "CastError") {
        res.status(404).json({ message: e.name, updated: false });
      } else {
        res.status(500).json({ message: "MongooseError", updated: false });
      }
    });
});

// PATCH ticket to undone by ticket id and /undone route
app.patch("/api/tickets/:ticketId/undone", (req, res) => {
  const { ticketId } = req.params;

  return Tickets.findByIdAndUpdate(ticketId, { done: false }, { new: true })
    .then(() => {
      res.status(200).json({ updated: true });
    })
    .catch((e) => {
      if (e.name === "CastError") {
        res.status(404).json({ message: e.name, updated: false });
      } else {
        res.status(500).json({ message: "MongooseError", updated: false });
      }
    });
});

module.exports = app;
