const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");
const {ObjectID} = require("mongodb");

var msg = "i am yash";

var hash = SHA256(msg).toString();



var ids = (() => {
    var idObj = {};
    var id = "";
    return {
        next:function(key){
            id = new ObjectID();
            idObj[key] = id;
            return id
        },
        value:(key) => {
            return idObj[key]
        }
    }
})()

// var ids = getId();

console.log(ids.next("1"));
console.log(ids.next("2"));
console.log(ids.value("1"));