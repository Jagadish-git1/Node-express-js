// imports

const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productRouter = require("./routes/products");
require("dotenv").config();
require("express-async-errors");

const app = express();

// Middlewares

app.use(express.json());

// Routes

app.get("/", (req, res) => {
  res.send(
    '<h1>NodeJs-Store-Api<h1><a href="/api/v1/products">Products Route </a>'
  );
});

app.use("/api/v1/products", productRouter);

// Error handling

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Server start
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // Connect to DB
    connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
