const express = require("express");
const path = require("path");
const app = express();

app.listen(8080, function () {
  console.log("listening on 8080");
});
app.use(express.static(path.join(__dirname, "./mr-daebak/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./mr-daebak/build/index.html"));
  console.log(req);
});
