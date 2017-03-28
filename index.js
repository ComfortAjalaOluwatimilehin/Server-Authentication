var express = require("express"),
http = require("http"),
morgan = require("morgan"),
bodyparser = require("body-parser"),
mongoose = require("mongoose"),
app = express(),
port = process.env.PORT || 3000,
db ="localhost/auth/auth"

//database setup
var connection = mongoose.connect(db, function(){console.log("Database connection established");})
//app setup
app.use(morgan("combined"))
app.use(bodyparser.json({type:"*/*"}))
app.set("port", port)
require("./router")(app)
//server setup

var server = http.createServer(app)

server.listen(app.get("port"), function(){  console.log("Server listening at: ", app.get("port"))})
