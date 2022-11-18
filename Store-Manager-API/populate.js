// Imports

const connectDB = require("./db/connect");
const productsJson = require("./products.json");
const Product = require("./models/product");
require("dotenv").config();

// Start the populate
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.create(productsJson);
    console.log("Success !!!");
  } catch (error) {
    console.log(error);
  }
};

start();
