const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Backend API listening on port ${port}`);
});
