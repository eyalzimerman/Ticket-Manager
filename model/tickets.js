const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userEmail: { type: String, required: true },
  done: { type: Boolean, required: true },
  creationTime: { type: Date, default: new Date() },
  labels: { type: Array },
});

ticketSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Tickets", ticketSchema);
