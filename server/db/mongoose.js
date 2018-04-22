const mongoose = require("mongoose");
const config = require("../config/config.json");

mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/ToDoApp").then((res) => {
// mongoose.connect("mongodb://todo:todo@ds155299.mlab.com:55299/todoapi").then((res) => {
mongoose.connect(config.dburl).then((res) => {
    // console.log(res)
    console.log("MongoDB connection establised successfully.")
}).catch((err) => {
    console.log(err)
});

module.exports = { mongoose }
