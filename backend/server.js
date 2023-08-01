const express = require("express");
const dotenv = require("dotenv").config();
const contactsRouter = require("./routes/contacts.router");
const errorHandling = require("./middleware/errorHandler");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/", contactsRouter);
app.use(errorHandling);

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
