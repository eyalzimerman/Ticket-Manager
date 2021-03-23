const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Tickets = require("./model/tickets");

app.use(express.static("client/build"));
app.use(express.json());

module.exports = app;
