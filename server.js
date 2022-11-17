const express = require("express");
const path = require("path");
const app = express();

app.listen(3000, function () {
  console.log("listening on 3000");
  console.log(path.join(__dirname, "mr-daebak/build/index.html"));
});
app.use(express.static(path.join(__dirname, "mr-daebak/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/mr-daebak/build/index.html"));
  console.log(req);
});
