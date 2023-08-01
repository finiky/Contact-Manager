const express = require("express");
const dotenv = require("dotenv").config()
const contactsRouter = require("./routes/contacts.router");
const app = express();

const port = process.env.PORT || 5000;
app.use("/", contactsRouter);
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
