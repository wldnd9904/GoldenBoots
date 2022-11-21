const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

let corsOptions = {
  origin: "*",
  credential: true,
};
app.use(cors(corsOptions));

app.listen(3000, function () {
  console.log("listening on 3000");
  console.log(path.join(__dirname, "mr-daebak/build/index.html"));
});

app.use(express.static(path.join(__dirname, "mr-daebak/build")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

const sessionObj = {
  secret: "kong",
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({ checkPeriod: 300000 }),
  cookie: {
    maxAge: 300000,
  },
};
app.use(session(sessionObj));

app.post("/register", function (req, res) {
  console.log("gd");
  const userID = req.body.userID;
  const password = req.body.password;
  const email = req.body.email;
  const name = req.body.name;
  const isStaff = req.body.isStaff;
  const sex = req.body.sex;
  const phone = req.body.phone;
  const birth = req.body.birth;
  var sql_insert = {
    userID: userID,
    password: password,
    email: email,
    name: name,
    isStaff: isStaff,
    sex: sex,
    phone: phone,
    birth: birth,
  };
  connection.query(
    "select userID from customer where userID=?",
    [userID],
    function (err, rows) {
      if (rows.length) {
        res.json({ result: "fail" });
      } else {
        connection.query(
          "insert into customer set?",
          sql_insert,
          function (err, rows) {
            if (err) throw err;
            console.log("ok");
            res.json({ result: "ok" });
          }
        );
      }
    }
  );
});

/*app.post('/login',function(req,res){
  const userID=req.body.userID
  const password=req.body.password

  var sql_select={userID:userID, password:password}
  connection.query('select userID from customer where userID=?',[userID],function(err,rows){
    if(rows.length){
      
    }else{
      res.json({'result':'fail'})
      connection.query('insert into customer set?',sql_insert,function(err,rows){
        if(err) throw err;
        console.log('ok')
        res.json({'result':'ok'})
      })
    }
  })
})*/
/*app.get("/dbtest",(req,res)=>{
  connection.connect();
  connection.query('SELECT * from customer', (error, rows, fields) => {
  if (error) throw error;
  //console.log('Customer info is: ', rows);
  res.send(rows);
});
  connection.end();
})*/
