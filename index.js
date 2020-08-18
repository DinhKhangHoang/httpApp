const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const { createProxyMiddleware } = require("http-proxy-middleware");
app.use(express.static("public"));

//It will parse application/json

app.use(
  "/api/users",
  createProxyMiddleware({
    target: "https://reqres.in",
    changeOrigin: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.listen(port, function () {
  console.log("Running on port 3000.");
});
