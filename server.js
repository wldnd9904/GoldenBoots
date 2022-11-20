const cors =require('cors');
const express = require("express");
const path = require("path");
const app = express();
const mysql      = require('mysql');

let corsOptions={
  origin:"*",
  credential:true
}
app.use(cors(corsOptions));
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'daebak',
  port: 3306
});

app.listen(3000, function () {
  console.log("listening on 3000");
  console.log(path.join(__dirname, "mr-daebak/build/index.html"));
});

app.use(express.static(path.join(__dirname, "mr-daebak/build")));

app.use(express.urlencoded({
  extended: true
}))


app.get("/", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/mr-daebak/build/index.html"));

});

app.post('/',function(req,res){
  const userID=req.body.userID
  const password=req.body.password
  const email=req.body.email
  const name=req.body.name
  const isStaff=req.body.isStaff
  const sex=req.body.sex
  const phone=req.body.phone
  const birth=req.body.birth
  var sql_insert={userID:userID, password:password, email:email, name:name, isStaff:isStaff,
    sex:sex,phone:phone,birth:birth}
  connection.query('select userID from customer where userID=?',[userID],function(err,rows){
    if(rows.length){
      res.json({'result':'fail'})
    }else{
      connection.query('insert into customer set?',sql_insert,function(err,rows){
        if(err) throw err;
        console.log('ok')
        res.json({'result':'ok'})
      })
    }
  })
})

app.get("/dbtest",(req,res)=>{
  connection.connect();
  connection.query('SELECT * from customer', (error, rows, fields) => {
  if (error) throw error;
  //console.log('Customer info is: ', rows);
  res.send(rows);
});
  connection.end();
})