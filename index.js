const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Database connected.");
  }
);

const authRouter = require("./routes/auth");
app.use("/user", authRouter);

app.listen(3000, () => {
  console.log("Server running at port 3000.");
});
