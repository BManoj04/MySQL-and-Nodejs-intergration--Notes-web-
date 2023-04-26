const express = require("express");
const path = require("path");
const ejsmate = require("ejs-mate");
var mysql = require('mysql');

const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "models")));


app.engine("ejs", ejsmate)
app.set("view engine", "ejs")

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ".manoj2364",
  database: "dbmsdb"
});


let count = 0
app.get("/",(req,res) =>{
  if(count == 0){
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "select task from tasks";
    
    con.query(sql, function (err, result) {
      if (err) throw err;
      alltasks = result
      let len = alltasks.length
      console.log(alltasks,len)
      let tasks = []
      for(let i =0 ;i<=len-1;i++){
        tasks.push(result[i].task)
      }
      console.log(tasks)
      count = 1
     return res.render("home.ejs", { tasks,len })
    });
  });}
  else{
    con.query("select task from tasks", function (err, result) {
      if (err) throw err;
      alltasks = result
      let len = alltasks.length
      console.log(alltasks,len)
      let tasks = []
      for(let i =0 ;i<=len-1;i++){
        tasks.push(result[i].task)
      }
      console.log(tasks)
      count = 1
     return res.render("home.ejs", { tasks,len })
    });
  }
})

app.get(("/new/:newtask"),(req,res) =>{
  newtask = req.params["newtask"]
  console.log(newtask)
  var sql = `INSERT INTO tasks(task) VALUES ('${newtask}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.redirect("/")
})

app.get(("/del/:item"),(req,res) =>{
  let delitem = req.params["item"]
  console.log(delitem)
  var sql = `DELETE FROM tasks WHERE task = '${delitem}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.redirect("/")
})

app.listen(3000, () => {
})