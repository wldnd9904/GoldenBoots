const cors =require('cors');
const express = require("express");
const path = require("path");
const app = express();
const mysql      = require('mysql');
const session = require('express-session');
const MemoryStore=require('memorystore')(session);

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

const sessionObj={
  secret:'kong',
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({checkPeriod: 300000}),
  cookie:{
    maxAge:300000
  },
}
app.use(session(sessionObj));

app.get("/", function (req, res) {
  console.log(res)
  res.sendFile(path.join(__dirname, "/mr-daebak/build/index.html"));

});

connection.connect();

app.post('/register',function(req,res){
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

app.post('/login',function(req,res){
  const userID=req.body.userID
  const password=req.body.password
  connection.query('select * from customer where userID=? and password=?',[userID,password], function(err,rows){
    if(rows.length){
      /*req.session.userID=rows[0].userID
      req.session.pw=rows[0].pw
      req.session.isLogined=true;
      req.session.save(function(){
        res.json(rows[0])
      })*/
      console.log('login ok')

      res.json(rows[0])
    }else{
      console.log('login fail')
      res.json({'result':'fail'})
    }
  })
})
// 이벤트 조회
app.post('/event',function(req,res){
  connection.query('select * from event',[], function(err,rows){
    if(rows.length){
      console.log('event find')
      res.json(rows)
    }else{
      console.log('event fail')
      res.json({'result':'fail'})
    }
  })
})
// 상품권 조회
app.post('/voucher',function(req,res){
  const userID=req.body.userID
  connection.query('select * from voucher where userID', [userID], function(err,rows){
    if(rows.length){
      console.log('voucher find')
      res.json(rows)
    }else{
      console.log('voucher fail')
      res.json({'result':'fail'})
    }
  })
})

// 스타일 조회
app.post('/style',function(req,res){
  connection.query('select * from style',[], function(err,rows){
    if(rows.length){
      console.log('style find')
      res.json(rows)
    }else{
      console.log('style fail')
      res.json({'result':'fail'})
    }
  })
})
// 디너 조회
app.post('/dinner',function(req,res){
  connection.query('select * from dinner',[], function(err,rows){
    if(rows.length){
      console.log('dinner find')
      res.json(rows)
    }else{
      console.log('dinner fail')
      res.json({'result':'fail'})
    }
  })
})

// 디테일 메뉴 조회
app.post('/detail',function(req,res){
  connection.query('select * from detailedmenutype',[], function(err,rows){
    if(rows.length){
      console.log('detail find')
      var tmp = {}
      rows.map((array)=>tmp[array.name]=array)
      //console.log(tmp)
      res.json(tmp)
    }else{
      console.log('detail fail')
      res.json({'result':'fail'})
    }
  })
})

// 주소 조회
app.post('/address',function(req,res){
  const userID=req.body.userID
  connection.query('select * from address where userID=?',[userID], function(err,rows){
    if(rows.length){
      console.log('address find')
      res.json(rows[0])
    }else{
      console.log('address fail')
      res.json({'result':'fail'})
    }
  })
})
/*app.get("/dbtest",(req,res)=>{
  connection.connect();
  connection.query('SELECT * from customer', (error, rows, fields) => {
  if (error) throw error;
  //console.log('Customer info is: ', rows);
  res.send(rows);
});
  connection.end();
})*/