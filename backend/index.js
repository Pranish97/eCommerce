const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
var cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = 8000 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log("Server is Running");
  });
});
