const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");


var msg = "i am yash";

var hash = SHA256(msg).toString();

console.log(hash);