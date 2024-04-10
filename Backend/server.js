const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connect = require("./db/connection");
const userRouter = require("./routes/userRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/user", userRouter);

// Error handling middleware
app.use(errorMiddleware);

const start = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log("Connected successfully to the database!");
      console.log(`Server is listening on port ${PORT}!`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

start();
