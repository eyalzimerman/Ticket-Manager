const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Tickets = require("./model/tickets");

app.use(express.static("client/build"));
app.use(express.json());

app.get("/api/tickets", async (req, res) => {
  try {
    let data = await Tickets.find({});
    const { searchText } = req.query;
    if (searchText) {
      data = data.filter((search) => {
        return search.title.toLowerCase().includes(searchText.toLowerCase());
      });
    }

    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Problem");
  }
});

app.patch("/api/tickets/:ticketId/done", (req, res) => {
  const { ticketId } = req.params;

  Tickets.findByIdAndUpdate(ticketId, { done: true }, { new: true })
    .then(() => {
      res.status(200).send({ updated: true });
    })
    .catch((e) => {
      if (e.name === "CastError") {
        res.status(404).send({ message: e.name, updated: false });
      } else {
        res.status(500).send({ message: "MongooseError", updated: false });
      }
    });
});

module.exports = app;
