const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const contactsRouter = require("./routes/contacts.router");
const userRouter = require("./routes/users.router");
const errorHandling = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const port = process.env.PORT || 5000;
const app = express();
connectDb();
app.use(cors());
app.use(express.json());
app.use("/", contactsRouter);
app.use("/", userRouter);
app.use(errorHandling);

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
