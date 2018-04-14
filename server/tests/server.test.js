const request = require("supertest");
const expect = require("expect");

const { app } = require("./../server.js");
const { todos } = require("./../models/todos.js");

beforeEach((done) => {
    todos.remove({}).then(() => {
        done();
    });
})

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

                todos.find({}).then(() => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => {
                    done(err);
                })
            })
    })
})