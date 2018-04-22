var express = require("express");
var bodyParser = require("body-parser");
var _ = require("lodash");
const config = require("./config/config.json");

var port = process.env.PORT;

const { ObjectID } = require("mongodb");
const { mongoose } = require("./db/mongoose.js");
const { users } = require("./models/users.js");
const { todos } = require("./models/todos.js");

var app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(new Date().toDateString() + " : " + req.method + " request for " + req.url);
    next();
});

app.post("/todos", (req, res) => {

    var newtodo = new todos({
        text: req.body.text
    });

    newtodo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        // console.log(req);
        res.status(400).send(err);
    }).catch((err) => {
        res.status(400).send(err);
    })

});

app.get("/todos", (req, res) => {

    todos.find({}).then((doc) => {
        res.send({
            doc
        });
    }, (err) => {
        res.status(400).send(err);
    }).catch((err) => {
        res.status(400).send(err);
    })

});


app.get("/todos/:id", (req, res) => {

    if (!ObjectID.isValid(req.params.id)) {
        res.status(404).send({ "error": "Request not valid." });
        return;
    };
    todos.find({
        _id: req.params.id
    }).then((doc) => {
        if (doc.length == 0) {
            return res.status(400).send({ "error": "Document not found." });
        }
        res.send({
            doc
        });
    }, (err) => {
        res.status(400).send(err);
    }).catch((err) => {
        res.status(400).send(err);
    });

});

app.delete("/todos/:id", (req, res) => {

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send({ "error": "Request not valid." });

    };

    todos.remove({
        _id: req.params.id
    }).then((doc) => {
        if (doc.n == 0) {
            return res.status(404).send({ "error": "Document not found." });
        }
        res.send({
            doc
        });
    }, (err) => {
        res.status(400).send(err);
    }).catch((err) => {
        res.status(400).send(err);
    });

});


app.patch("/todos/:id", (req, res) => {

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send({ "error": "Request not valid." });

    };

    var body = _.pick(req.body,["text","completed"])

    if ( _.isBoolean(body.completed) && body.completed ){
        body.completedAt = new Date();
        body.completed = true;
    }else{
        body.completedAt = null;
        body.completed = false;
    }

    todos.findOneAndUpdate({
        _id: req.params.id
    },{
        $set:body
    },{
        new:true
    }).then((doc) => {
        if (!doc) {
            return res.status(404).send({ "error": "Document not found." });
        }
        res.status(200).send({doc});
    }, (err) => {
        res.status(400).send(err);
    }).catch((err) => {
        res.status(400).send(err);
    });

});


app.listen(port || 3000, () => {
    console.log("Server started no port 3000...");
})

module.exports = {
    app
};