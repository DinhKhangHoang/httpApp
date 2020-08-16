const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();
const port = 3000;
app.use(express.static("public"));
var proxy = require("http-proxy").createProxyServer({
  host: "https://reqres.in/",
  // port: 80
});
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/users", async (req, res, next) => {
  try {
    let response = await axios.get("https://reqres.in/api/users");
    console.log(response.data);
    res.setHeader("Content-Type", "application/json");
    res.send({ data: response.data });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, function () {
  console.log("Running on port 3000.");
});
