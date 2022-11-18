const express = require("express");
const connectDB = require("./db/Connection");
const tasksRouter = require("./Routes/Tasks");
const notFound = require("./Middleware/NotFound");
const errorHandler = require("./Middleware/errorHandler");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
app.get("/hello", (req, res) => {
  res.send("Hello world");
});

app.use("/api/v1/tasks", tasksRouter);
app.use(notFound);
app.use(errorHandler);
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
