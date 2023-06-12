// Load variables from .env
require("dotenv").config();

// Backend framework
const express = require("express");
// To determine the image directory
const path = require("path");

// backend server port loaded from dotEnv
const port = process.env.PORT;

// Initialize the application
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const router = require("./routes/Router.js");
app.use(router);

app.listen(port, () => {
  console.log(`Express server listening on port  ${port}`);
});
