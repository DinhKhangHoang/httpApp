const express = require("express");
const path = require("path");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

//It will parse application/json
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/users", async (req, res) => {
  try {
    let response = await axios.get("https://reqres.in/api/users");
    // console.log(response.data);
    res.setHeader("Content-Type", "application/json");
    res.send({ data: response.data });
  } catch (error) {
    console.log(error);
  }
});

app.post("/users", async (req, res) => {
  try {
    //console.log(req.body);
    let response = await axios.post("https://reqres.in/api/users", req.body);
    res.setHeader("Content-Type", "application/json");
    res.send({ data: response.data });
  } catch (error) {
    console.log(error);
  }
});

app.put("/users", async (req, res) => {
  try {
    //console.log(req.body);
    let response = await axios.post("https://reqres.in/api/users", req.body);
    res.setHeader("Content-Type", "application/json");
    res.send({ data: response.data });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, function () {
  console.log("Running on port 3000.");
});
