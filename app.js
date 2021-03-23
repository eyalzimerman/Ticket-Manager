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

module.exports = app;
