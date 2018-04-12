var express = require("express");
var bodyParser = require("body-parser");

var port = process.env.port;

const mongoose = require("./db/mongoose");
const {users} = require("./models/users.js");
const {todos} = require("./models/todos.js");

var app = express();

app.use(bodyParser.json());

app.post("/todos",(req,res) => {
    var todo = new todos({
        text:req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    },(err) => {
        res.status(400).send(err);
    })

});

app.listen(port||3000,() => {
    console.log("Server started no port 3000...");
})

