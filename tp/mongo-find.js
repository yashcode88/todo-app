// const mc = require("mongodb").MongoClient;
const mdb = require("mongodb");
// const args = require("yargs");
const mc = mdb.MongoClient;
const ObjectID = mdb.ObjectID;

mc.connect("mongodb://localhost:27017/ToDoApp", (err, client) => {
    if (err) {
        console.log(`Unable to connect to DB : ${err.message}`)
        return;
    }

    console.log("Connected to MongoDB.");
    var db = client.db("ToDoApp");

    var operation = "find";

    db.collection("Todos")[operation]({text:"clean room"}).toArray().then((doc) =>{
        console.log(JSON.stringify(doc,undefined,2));
    },(err)=>{
        console.log("Fatts : " + err)
    });

    client.close();
});

console.log("last line");