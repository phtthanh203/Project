var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var mysql = require('mysql2');
var app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// connect
var con = mysql.createConnection({
host: "localhost",
port: "3306",
user: "root",
password: "201104",
insecureAuth: true,
database: "cambiencon"
});
con.connect(function (err) {
if (err) throw err;
console.log("Connected!!!")
var sql = "select * from information;";
con.query(sql, function (err, results) {
if (err) throw err;
console.log(results);
})
});
//viết api
app.get("/all", function (req, res) {
var sql = "select * from information";
con.query(sql, function (err, results) {
if (err) throw err;
res.send(results);
});
})
app.post("/add", function (req, res) {
const {acoholvalue,tinhtrang} = req.body
var sql = "insert into information(acoholvalue,tinhtrang,atTime) values("+acoholvalue+",'"+tinhtrang+"',NOW())";
console.log(sql);
con.query(sql, function (err, results) {
if (err) throw err;
res.send(" them thanh cong");
});
});
app.get("/delete", function (req, res) {
    var sql = "TRUNCATE TABLE information";
    con.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
    });
    })
// server đang chạy ở cổng
var server = app.listen(2727, function () {
var host = server.address().address
var port = server.address().port
console.log("Server is listening at http://%s:%s", host, port)
})