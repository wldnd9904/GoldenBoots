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
        ////if(err) throw err;
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
      
      console.log('login ok')
      res.json(rows[0])
    }else{
      console.log('login fail')
      res.json({'result':'fail'})
    }
  })
})
//개인정보 조회
app.post('/userfind',function(req,res){
  const userID=req.body.userID
  connection.query('select * from customer where userID=?',[userID], function(err,rows){
    if(rows.length){
      /*req.session.userID=rows[0].userID
      req.session.pw=rows[0].password
      req.session.isLogined=true;
      req.session.save(function(){
        //res.json(rows[0])
        res.redirect('/')
      })*/
      console.log('user find ok')

      res.json(rows[0])
    }else{
      console.log('login fail')
      res.json({})
    }
  })
})
/*
app.post('/logout',function(req,res){
  delete req.session.userID;
  delete req.session.pw;
  delete req.session.isLogined;
  req.session.save(function(){
    res.redirect('/');
    console.log('logout ok')
  })
})*/

// 이벤트 조회
app.post('/event',function(req,res){
  connection.query('select * from event',[], function(err,rows){
    if(rows.length){
      console.log('event find')
      res.json(rows)
    }else{
      console.log('event fail')
      res.json([])
    }
  })
})
// 상품권 조회
app.post('/voucher',function(req,res){
  const userID=req.body.userID
  connection.query('select * from voucheruserrelation where userID=?', [userID], function(err,rows){
    //console.log(rows.map(data=>data.voucherID).toString())
    connection.query(`select * from voucher where voucherID IN (${rows.map(data=>data.voucherID).toString()})`, [], function(err,rows){
      //console.log(rows)
      res.json(rows)
      
    })
  })
})
// 상품권 발급
app.post('/vouchergrant',function(req,res){
  const voucherID=req.body.voucherID
  const userID=req.body.userID
  connection.query('insert into voucheruserrelation values (?,?)',[voucherID,userID],function(err,rows){
    //if(err) console.log('voucher grant fail');
    console.log('voucher grant ok')
    res.json({'result':'OK'})
  })


})
// 상품권 사용
app.post('/voucheruse',function(req,res){
  const voucherID=req.body.voucherID
  const userID=req.body.userID
  console.log(voucherID,userID)
  connection.query('select * from voucheruserrelation where voucherID=? and userID=?',[voucherID,userID], function(err,rows){
    if(rows.length){
      connection.query('delete from voucheruserrelation where voucherID=? and userID=?',[voucherID,userID],function(err,rows){
        //if(err) throw err;
        console.log('voucher use ok')
        res.json({'result':'ok'})
      })
    }else{
      console.log('voucher use fail')
      res.json([])
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
      res.json([])
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
      res.json([])
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
      res.json([])
    }
  })
})

// 주소 생성
app.post('/address',function(req,res){
  const addressID=req.body.addressID
  const userID=req.body.userID
  const name=req.body.name
  const address1=req.body.address1
  const address2=req.body.address2
  var sql_address={addressID:addressID, userID:userID, name:name, address1:address1, address2:address2}
  //console.log(req.body)

  connection.query('insert into address set?',sql_address,function(err,rows){
    ////if(err) throw err;
    console.log('address ok')
    res.json(rows[0])
  })


})
// 주소 조회
app.post('/address2',function(req,res){
  const userID=req.body.userID
  connection.query('select * from address where userID=?',[userID], function(err,rows){
      console.log('address find')
      res.json(rows)
  })
})
// 주소 삭제
app.post('/address3',function(req,res){
  const addressID=req.body.addressID
  const userID=req.body.userID
  connection.query('select * from address where addressID=? and userID=?',[addressID,userID], function(err,rows){
    if(rows.length){
      connection.query('delete from address where addressID=? and userID=?',[addressID,userID],function(err,rows){
        //if(err) throw err;
        console.log('address delete ok')
        res.json({'result':'ok'})
      })
    }else{
      console.log('address delete fail')
      res.json([])
    }
  })
})
// 마이 페이지 수정
app.post('/modified',function(req,res){
  const userID=req.body.userID
  const password=req.body.password
  const email=req.body.email
  const name=req.body.name
  const isStaff=(req.body.isStaff=="true"?1:0)
  const sex=req.body.sex
  const phone=req.body.phone
  const birth=req.body.birth
  var sql_update={userID:userID, password:password, email:email, name:name, isStaff:isStaff,
    sex:sex,phone:phone,birth:birth}
  //console.log(req.body)
  connection.query('select userID from customer where userID=?',[userID],function(err,rows){

    if(rows.length){
      console.log('modify ok')
      connection.query('Update customer set? where userID=?',[sql_update,userID],function(err,rows){
        //if(err) throw err;
      })
      connection.query('select userID from customer where userID=?',[userID],function(err,rows){
        //if(err) throw err;
        res.json(rows[0])
      })
      //res.json({'result':'modify ok'})
    }else{
      console.log('fail')
      res.json([])
    }
  })
})

// 주문하기
app.post('/order',function(req,res){
  var i=0
  if (req.body.orderList){
    connection.query ("select max(orderID) as max_ID from ordering",[],function(err,rows){
      i=rows[0].max_ID
      console.log("orderID: "+parseInt(i+1))
      for(order in req.body.orderList){
        connection.query("insert into ordering (orderID," + Object.keys(req.body.orderList[order]).toString() + ") values ("+ ++i+"," + `"`+ Object.values(req.body.orderList[order]).toString().replaceAll(",",`","`)+`"` + ")",[],function(err,rows){
        //if(err) throw err;
        connection.query("update ordering set description='pending' where orderID=?",[i],function(err,rows){
          //if(err) throw err;

        })
      })
    }
    res.json({'result':'ok'})
      //if(err) throw err;
    })
  }
})
// 최근 주문 불러오기
app.post('/recentorder',function(req,res){
  const userID=req.body.userID
  connection.query('select *  from ordering where userID=? and description <> "canceled" Limit 10',[userID], function(err,rows){
    console.log('order find')
    res.json(rows)
  })
})
// 주문 취소하기
app.post('/ordercancel',function(req,res){
  const orderID=req.body.orderID
  connection.query('select * from ordering where orderID=?',[orderID], function(err,rows){
    if(rows.length){
      connection.query('Update ordering set description="canceled" where orderID=?',[orderID],function(err,rows){
        //if(err) throw err;
        console.log('order canceled ok')
        res.json({'result':'ok'})
      })
    }else{
      console.log('order canceled fail')
      res.json([])
    }
  })
})
// 주문 변경하기
app.post('/orderedit',function(req,res){
  const order=req.body.order
  const orderID=req.body.order.orderID
  if (req.body.order){
    connection.query ("select * from ordering where orderID=?",[orderID],function(err,rows){
      //if(err) throw err;
      connection.query ("delete from ordering where orderID=?",[orderID],function(err,rows){
        //if(err) throw err;
          connection.query("insert into ordering (" + Object.keys(order).toString() + ") values ("+ `"`+ Object.values(order).toString().replaceAll(",",`","`)+`"` + ")",[],function(err,rows){
            //if(err) throw err;
            res.json({'result':"ok"})
            console.log("order edit ok")
         })
      })
    })
  }
})
// 회원 삭제하기
app.post('/userdelete',function(req,res){
  const userID=req.body.userID
  connection.query('select * from customer where userID=?',[userID], function(err,rows){
    if(rows.length){
      connection.query('delete from customer where userID=?',[userID],function(err,rows){
        //if(err) throw err;
        console.log('user delete ok')
        res.json({'result':'ok'})
      })
    }else{
      console.log('user delete fail')
      res.json([])
    }
  })
})
// 회원 조회
app.post('/userlist',function(req,res){
  connection.query('select * from customer',[], function(err,rows){
    console.log('user find')
    res.json(rows)
  })
})
// 재고 조회
app.post('/stockget',function(req,res){
  connection.query('select * from stock',[], function(err,rows){
      console.log('stock find')
      var sendData = {}
      rows.forEach(menu => sendData[`${menu.name}`]=`${menu.stock}`)  
      res.json(sendData)
  })
})
// 재고 설정
app.post('/stockset',function(req,res){
  const name=req.body.name
  const stock=req.body.stock
  const price=req.body.price
  connection.query ("select * from stock where name=?",[name],function(err,rows){
    //if(err) throw err;
    connection.query ("update stock set stock = ? where name=?",[stock,name],function(err,rows){
      //if(err) throw err;
      console.log("stock edit ok")
    })
    connection.query ("update detailedmenutype set price = ? where name=?",[price,name],function(err,rows){
      //if(err) throw err;
      console.log("stock price edit ok")
    })
    res.json({'result':'ok'})
  })
})
// 재고 사용
app.post('/stockuse',function(req,res){
  const data=req.body.data
  if(data!=undefined && data.length){
    for(pair in data) {
      const name = data[pair].name
      const count = data[pair].count
      connection.query ("select stock-? as remain from stock where name=?",[count,name],function(err,rows){
        //if(err) throw err;
        console.log(rows[0].remain)
        
        connection.query ("update stock set stock = ? where name=?",[rows[0].remain,name],function(err,rows){
          //if(err) throw err;
          console.log("stock edit ok")
        })
      })
    }
    res.json({'result':'ok'})
  }
})

// 스타일 삭제
app.post('/styledelete',function(req,res){
  const styleID=req.body.styleID
  connection.query('select * from style where styleID=?',[styleID], function(err,rows){
    if(rows.length){
      connection.query('delete from style where styleID=?',[styleID],function(err,rows){
        //if(err) throw err;
        console.log('style delete ok')
        res.json({'result':'ok'})
      })
    }else{
      console.log('style delete fail')
      res.json([])
    }
  })
})

// 스타일 추가
app.post('/styleadd',function(req,res){
  var m=0

  connection.query ("select max(styleID) as max_ID from style",[],function(err,rows){
    //if(err) throw err;
    m=rows[0].max_ID
    console.log("style add:"+(m+1))
    connection.query("insert into style (styleID) values (?)",[m+1],function(err,rows){
      //if(err) throw err;
      res.json(rows)
    })
  })
  
})
// 스타일 수정
app.post('/styleedit',function(req,res){
  const data=req.body.data
  const styleID=req.body.data.styleID
  if (req.body.data){
    connection.query ("select * from style where styleID=?",[styleID],function(err,rows){
      //if(err) throw err;
      connection.query ("delete from style where styleID=?",[styleID],function(err,rows){
        //if(err) throw err;
        connection.query("insert into style (" + Object.keys(data).toString() + ") values ("+ `"`+ Object.values(data).toString().replaceAll(",",`","`)+`"` + ")",[],function(err,rows){
          //if(err) throw err;
          res.json({'result':"ok"})
          console.log("style edit ok")
        })
      })
    })
  }
})
// 디너 삭제 
app.post('/dinnerdelete',function(req,res){
  const dinnerID=req.body.dinnerID
  connection.query('select * from dinner where dinnerID=?',[dinnerID], function(err,rows){
    if(rows.length){
      connection.query('delete from dinner where dinnerID=?',[dinnerID],function(err,rows){
        //if(err) throw err;
        console.log('dinner delete ok')
        res.json({'result':'ok'})
      })
    }else{
      console.log('dinner delete fail')
      res.json([])
    }
  })
})
// 디너 추가
app.post('/dinneradd',function(req,res){
  var k=0

  connection.query ("select max(dinnerID) as max_ID from dinner",[],function(err,rows){
    //if(err) throw err;
    k=rows[0].max_ID
    console.log("dinner add:"+(k+1))
    connection.query("insert into dinner (dinnerID) values (?)",[k+1],function(err,rows){
      //if(err) throw err;
      res.json(rows)
    })
    /*req.body.data.map((dinnerlist)=>{
      connection.query("insert into dinner (dinnerID, " + Object.keys(dinnerlist).toString() + ") values ("+ ++k+"," + `"`+ Object.values(dinnerlist).toString().replaceAll(",",`","`)+`"` + ")",[],function(err,rows){
      //if(err) throw err;
    })
  })*/
  })
  
})
// 디너 수정
app.post('/dinneredit',function(req,res){
  const data=req.body.data
  const dinnerID=req.body.data.dinnerID
  if (req.body.data){
    connection.query ("select * from dinner where dinnerID=?",[dinnerID],function(err,rows){
      //if(err) throw err;
      connection.query ("delete from dinner where dinnerID=?",[dinnerID],function(err,rows){
        //if(err) throw err;
        connection.query("insert into dinner (" + Object.keys(data).toString() + ") values ("+ `"`+ Object.values(data).toString().replaceAll(",",`","`)+`"` + ")",[],function(err,rows){
          if(err) throw err;
          res.json({'result':"ok"})
          console.log("dinner edit ok")
        })
      })
    })
  }
})
// 모든 상품권 조회
app.post('/voucherlist',function(req,res){
  connection.query('select * from voucher', [], function(err,rows){
    if(rows.length){
      console.log('voucherlist find')
      res.json(rows)
    }else{
      console.log('voucherlist fail')
      res.json([])
    }
  })
})
// 상품권 삭제
app.post('/voucherdelete',function(req,res){
  const voucherID=req.body.voucherID
  connection.query('select * from voucher where voucherID=?',[voucherID], function(err,rows){
    if(rows.length){
      connection.query('delete from voucher where voucherID=?',[voucherID],function(err,rows){
        //if(err) throw err;
        console.log('voucher delete ok')
        res.json({'result':'ok'})
      })
    }else{
      console.log('voucher delete fail')
      res.json([])
    }
  })
})
// 상품권 수정
app.post('/voucheredit',function(req,res){
  const data=req.body.data
  const voucherID=req.body.data.voucherID
  if (req.body.data){
    connection.query ("select * from voucher where voucherID=?",[voucherID],function(err,rows){
      //if(err) throw err;
      connection.query ("delete from voucher where voucherID=?",[voucherID],function(err,rows){
        //if(err) throw err;
        connection.query("insert into voucher (" + Object.keys(data).toString() + ") values ("+ `"`+ Object.values(data).toString().replaceAll(",",`","`)+`"` + ")",[],function(err,rows){
          //if(err) throw err;
          res.json({'result':"ok"})
          console.log("voucher edit ok")
        })
      })
    })
  }
})
// 상품권 추가
app.post('/voucheradd',function(req,res){
  var k=0

  connection.query ("select max(voucherID) as max_ID from voucher",[],function(err,rows){
    //if(err) throw err;
    k=rows[0].max_ID
    console.log("voucher add:"+(k+1))
    connection.query("insert into voucher (voucherID) values (?)",[k+1],function(err,rows){
      //if(err) throw err;
      res.json(rows)
    })
  })
  
})
// 오더 리스트 조회
app.post('/orderpending',function(req,res){
  connection.query('select * from ordering order by orderID desc', [], function(err,rows){
    console.log('order pending list find')
    res.json(rows)
  })
})
// 오더 상태 수정
app.post('/orderalter',function(req,res){
  const orderID=req.body.orderID
  const state=req.body.state
  connection.query ("select * from ordering where orderID=?",[orderID],function(err,rows){
    //if(err) throw err;
    connection.query ("update ordering set description=? where orderID=?",[state,orderID],function(err,rows){
      //if(err) throw err;
      console.log("order alter ok")
      res.json({'result':'ok'})
    })
  })

})
// 이벤트 삭제
app.post('/eventdelete',function(req,res){
  const eventID=req.body.eventID
  connection.query('select * from event where eventID=?',[eventID], function(err,rows){
    if(rows.length){
      connection.query('delete from event where eventID=?',[eventID],function(err,rows){
        //if(err) throw err;
        console.log('event delete ok')
        res.json({'result':'ok'})
      })
    }else{
      console.log('event delete fail')
      res.json([])
    }
  })
})
// 이벤트 수정
app.post('/eventedit',function(req,res){
  const data=req.body.data
  const eventID=req.body.data.eventID
  //console.log(data)
  if (req.body.data){
    connection.query ("select * from event where eventID=?",[eventID],function(err,rows){
      //if(err) throw err;
      connection.query ("delete from event where eventID=?",[eventID],function(err,rows){
        //if(err) throw err;
        connection.query("insert into event (" + Object.keys(data).toString() + ") values ("+ `"`+ Object.values(data).toString().replaceAll(",",`","`)+`"` + ")",[],function(err,rows){
          //if(err) throw err;
          res.json({'result':"ok"})
          console.log("event edit ok")
        })
      })
    })
  }
})
// 이벤트 추가
app.post('/eventadd',function(req,res){
  var n=0

  connection.query ("select max(eventID) as max_ID from event",[],function(err,rows){
    //if(err) throw err;
    n=rows[0].max_ID
    console.log("event add:"+(n+1))
    connection.query("insert into event (eventID) values (?)",[n+1],function(err,rows){
      //if(err) throw err;
      res.json(rows)
    })
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
