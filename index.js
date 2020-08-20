const express = require("express");
const app = express();
const port = 3000;
const { createProxyMiddleware } = require("http-proxy-middleware");
app.use(express.static("public"));

app.use(
  "/api/users",
  createProxyMiddleware({
    target: "https://reqres.in",
    changeOrigin: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.listen(port, function () {
  console.log("Running on port 3000.");
});
