const express = require("express");
const path = require("path");
const app = express();
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'daebak',
  port: 8200
});

app.listen(3000, function () {
  console.log("listening on 3000");
  console.log(path.join(__dirname, "mr-daebak/build/index.html"));
});

app.use(express.static(path.join(__dirname, "mr-daebak/build")));


app.get("/", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/mr-daebak/build/index.html"));

});

app.get("/dbtest",(req,res)=>{
  connection.connect();
  connection.query('SELECT * from customer', (error, rows, fields) => {
  if (error) throw error;
  //console.log('Customer info is: ', rows);
  res.send(rows);
});
  connection.end();
})