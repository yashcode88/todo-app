var cnt = (() => { var i = 0; return () => { return i++ } })()
const request = require("supertest");
const expect = require("expect");
const { ObjectID } = require("mongodb");

const { app } = require("./../server.js");
const { todos } = require("./../models/todos.js");

const newtodos = [
    {
        _id: new ObjectID(), "text": "todo1"
    },
    {
        _id: new ObjectID(), "text": "todo2"
    }
]

beforeEach((done) => {
    todos.remove({}).then(() => {
        return todos.insertMany(newtodos, (error, docs) => {
            if (error) return done(error);
        });
    }).then(() => {
        done();
    }).catch((err) => {
        // console.log(err)
        done();
    });
})

describe("post/ todos", () => {
    console.log(cnt())

    it("should create a new todo", (done) => {
        var text = "test todo text";
        request(app)
            .post("/todos")
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) return done(err);

                todos.find({ "_id": res.body._id }).then((result) => {
                    // expect(result.length).toBe(1);
                    expect(result[0].text).toBe(text);
                    done();
                }).catch((err) => {
                    done(err);
                })
            })
    })

    it("should fail for invalid object", (done) => {
        // var text = "test todo text";

        request(app)
            .post("/todos")
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);

                todos.find({}).then((result) => {
                    done();
                }).catch((err) => {
                    done(err);
                })
            })
    })
})


describe("get/ todos", () => {
    it("should return all todos", (done) => {

        request(app)
            .get("/todos")
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                todos.find({}).then((result) => {
                    expect(result.length).toBeGreaterThan(0);
                    done();
                }).catch((err) => {
                    done(err);
                })
            })
    })

    it("should return todo for the specified objectid", (done) => {
        // var text = "test todo text";

        request(app)
            .get(`/todos/${newtodos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.doc[0].text).toBe(newtodos[0].text)
            })
            .end((err, res) => {
                if (err) return done(err);
                done();
            })
    });

    it("should return 400 bad request if invalid id", (done) => {
        // var text = "test todo text";

        request(app)
            .get(`/todos/${new ObjectID()}`)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                done();
            })
    });

    it("should return 404 bad request if id not found", (done) => {
        // var text = "test todo text";

        request(app)
            .get("/todos/5ad3a2642114e")
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                done();
            })
    });
})


describe("DELETE/ todos", () => {
    it("should delete a todo", (done) => {

        var hexid = newtodos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexid}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                todos.count({ _id: hexid }, (err, count) => {
                    expect(count).toBe(0);
                    done();
                });
            })
    })

    it("should return 400", (done) => {

        request(app)
            .delete(`/todos/6adad8131daa2228549246ff`)
            .expect(400)
            .end((err, res) => {
                done();
            });

    })


    it("should return not found", (done) => {

        request(app)
            .delete(`/todos/5adad81`)
            .expect(404)
            .end((err, res) => {
                done();
            });

    })

})
