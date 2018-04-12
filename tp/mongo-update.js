// const mc = require("mongodb").MongoClient;
const mdb = require("mongodb")
const mc = mdb.MongoClient;
const ObjectID = mdb.ObjectID;

mc.connect("mongodb://localhost:27017/ToDoApp", (err, client) => {
    if (err) {
        console.log(`Unable to connect to DB : ${err.message}`)
        return;
    }

    console.log("Connected to MongoDB.");
    var db = client.db("ToDoApp");

    db.collection("Todos").findOneAndUpdate({
        _id:ObjectID("5acf5ad1459584c0098da1ac")
    },{
        $set:{completed:0}
    },{
        returnOriginal:false
    }).then((res) => {
        console.log(JSON.stringify(res,undefined,2));
    });

  

});


console.log("last line");