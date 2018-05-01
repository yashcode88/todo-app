const { todos } = require("../models/todos.js");

module.exports = function (app, _, ObjectID) {

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
            res.status(400).send({ "error": "Request not valid." });
            return;
        };
        todos.find({
            _id: req.params.id
        }).then((doc) => {
            if (doc.length == 0) {
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


    app.delete("/todos/:id", (req, res) => {

        var idToRemove = req.params.id;
        if (!ObjectID.isValid(idToRemove) && idToRemove != "*") {
            return res.status(400).send({ "error": "Request not valid." });

        };

        var filterObj = {};
        if (idToRemove != "*") {
            filterObj = {
                _id: req.params.id
            };
        }

        todos.remove(filterObj).then((doc) => {
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


    app.put("/todos/:id", (req, res) => {

        if (!ObjectID.isValid(req.params.id)) {
            return res.status(400).send({ "error": "Request not valid." });

        };

        var body = _.pick(req.body, ["text", "completed"])

        if (_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date();
            body.completed = true;
        } else {
            body.completedAt = null;
            body.completed = false;
        }

        todos.findOneAndUpdate({
            _id: req.params.id
        }, {
                $set: body
            }, {
                new: true
            }).then((doc) => {
                if (!doc) {
                    return res.status(404).send({ "error": "Document not found." });
                }
                res.status(200).send({ doc });
            }, (err) => {
                res.status(400).send(err);
            }).catch((err) => {
                res.status(400).send(err);
            });

    });

}