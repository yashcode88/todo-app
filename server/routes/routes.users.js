const { users } = require("../models/users.js");
const { authenticate } = require("../middleware/authenticate.js");

module.exports = function (app, _, ObjectID) {

    //users POST
    app.post("/users", (req, res) => {

        var body = _.pick(req.body, ["email", "password"])
        var newUser = new users(body);

        lineNo();
        newUser.save().then((doc) => {
            // res.send(doc);
            lineNo();
            return newUser.generateAuthToken();
        }, (err) => {
            // console.log(req);
            lineNo();
            res.status(400).send(err);
        }).then((token) => {
            lineNo();
            return res.header("x-auth", token).send(newUser);
        }).catch((err) => {
            lineNo();
            res.status(400).send(err);
        })

    });

    //users GET
    app.get("/users", (req, res) => {

        users.find({}).then((doc) => {
            res.send({
                doc
            });
        }, (err) => {
            res.status(400).send(err);
        }).catch((err) => {
            res.status(400).send(err);
        })

    });

    //users GET
    app.get("/users/me", authenticate , (req, res) => {
        res.send(req.user);
    });

}