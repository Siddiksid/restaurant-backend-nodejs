const express = require("express");
const db = require("./db");

const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to our hotel");
});

// import the router files

const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuItemRoutes");

//use the routes

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
