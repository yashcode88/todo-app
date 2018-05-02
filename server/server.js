lineNo = function () { console.log(new Error("").stack.split("at ")[2]) }
require("./config/config.js");
var express = require("express");
var bodyParser = require("body-parser");
// var _ = require("lodash");
var port = process.env.PORT;

// const { ObjectID } = require("mongodb");
const { mongoose } = require("./db/mongoose.js");
// const { users } = require("./models/users.js");
// const { todos } = require("./models/todos.js");

var app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(new Date().toDateString() + " : " + req.method + " request for " + req.url);
    next();
});

require("./routes/index.js")(app);

app.listen(port, () => {
    console.log(`Server started no port ${port}...`);
})

module.exports = {
    app
};