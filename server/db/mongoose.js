const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

var dburl = process.env.DBURL || "mongodb://localhost:27017/ToDoApp";
mongoose.connect(dburl).then((res) => {
    // console.log(res)
    console.log("MongoDB connection establised successfully.")
}).catch((err) => {
    console.log(err)
});

module.exports = { mongoose }
