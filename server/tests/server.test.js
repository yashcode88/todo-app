const request = require("supertest");
const expect = require("expect");
const { ObjectID } = require("mongodb");

const { app } = require("./../server.js");
const { todos } = require("./../models/todos.js");
const { addNewTodos, addNewUsers, newusers, newtodos } = require("./seed/seed.js");

beforeEach(addNewTodos);
// beforeEach(addNewUsers);

describe("post/ todos", () => {

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

    it("should return 404 invalid id", (done) => {
        // var text = "test todo text";

        request(app)
            .get(`/todos/${new ObjectID()}`)
            .expect(404)
            .end(done)
    });

    it("should return 400 bad request if id not found", (done) => {
        // var text = "test todo text";

        request(app)
            .get("/todos/5ad3a2642114e")
            .expect(400)
            .end(done)
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

    it("should return 404", (done) => {

        request(app)
            .delete(`/todos/6adad8131daa2228549246ff`)
            .expect(404)
            .end(done);

    })


    it("should return 400 for invalid request", (done) => {

        request(app)
            .delete(`/todos/5adad81`)
            .expect(400)
            .end(done);

    })

})

describe("PATCH/ todos", () => {
    it("should update a todo", (done) => {

        var updateText = "this is updated todo";
        var hexid = newtodos[0]._id.toHexString();
        request(app)
            .put(`/todos/${hexid}`)
            .send({
                text: updateText,
                completed: false
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                todos.findById(hexid, (err, doc) => {
                    expect(doc.text).toBe(updateText);
                    expect(doc.completed).toBe(false);
                    expect(doc.completedAt).toBe(null);
                    done();
                });
            })
    })

    it("should return 404", (done) => {

        request(app)
            .put(`/todos/6adad8131daa2228549246ff`)
            .expect(404)
            .end(done);

    })


    it("should return 400 for invalid request", (done) => {

        request(app)
            .put(`/todos/5adad81`)
            .expect(400)
            .end(done);

    })

})
