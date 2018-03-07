const express = require('express');
const port = process.env.PORT || 4007;
const app = express();

var bodyParser = require('body-parser');
var mysql = require("mysql");

var con = mysql.createConnection(process.env.JAWSDB_URL);

con.connect(function(err) {
      if (err) throw err;
      console.log("DB Connected!");
});
//ACCESS TO DB: mysql -u root -p
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://contestdata.herokuapp.com/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//var jsonParser = bodyParser.json();

var alldata = [];


app.get('/getquiz/:mtype',function(req,resp,next){
    
    
   /*if (!req.body) throw error;*/
    var tblname = "";
    if(req.params.mtype == "general"){
        tblname = "general"
    } else if(req.params.mtype == "d3"){
        tblname = "d3"
    } else if(req.params.mtype == "library"){
        tblname = "library"
    } else if(req.params.mtype == "recreation"){
        tblname = "recreation"
    } 
    console.log(tblname);
    con.query('SELECT * FROM '+tblname, function (err, rows, fields) {
    if (err) throw err
    console.log('get data');
    
    alldata = rows;
    console.log("data transfer", alldata[0].question);
    resp.send(alldata);
});
    
/*   var sql = "INSERT INTO boards SET ?"
    
    con.query(sql,req.body,(err, result)=>{
        if(err) throw err;
        console.log(result);
        resp.send('inserted successfully');
    })*/
});



app.listen(port,(err)=>{
    if(err){
        console.log("Error"+err);
        return false;
    }
    console.log("Contest data server is running.");
})