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

    var doc = [];
    var i = 0
    // for (var i = 0; i < 1e6; i++) {
        // if (i % 1e5 == 0) {
        //     console.log(i + " done")
        //     // client.close();
        // }

        doc[i] = {
            "name": "salman khan " + i,
            "age": 52,
            "location": "jodhpur prison"
        };
    // }
    db.collection("users").insertMany(doc, (err, result) => {
        if (err) {
            console.log(err)
            return console.log(`Error occured : ${err.message}`);
        }

        // var db = client.db("ToDoApp");
        // console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,4));
        client.close();
    });

  

});


console.log("last line");