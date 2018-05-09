const { ObjectID } = require("mongodb");
const { todos } = require("./../../models/todos.js");
const { users } = require("./../../models/users.js");



var ids = (() => {
    var idObj = {};
    var id = "";
    return {
        next:function(key){
            id = new ObjectID();
            idObj[key] = id;
            return id
        },
        value:(key) => {
            return idObj[key]
        }
    }
})()

const newtodos = [{
    _id: ids.next("todo1"),
    "text": "todo1"
}, {
    _id: ids.next("todo2"),
    "text": "todo2"
}]

const newusers = [{
    _id: ids.next("user1"), 
    "text": "todo1"
}, {
    _id: ids.next("user2"), 
    "text": "todo2"
}]

const addNewTodos = (done) => {
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
}


const addNewUsers = (done) => {
    users.remove({}).then(() => {
        return users.insertMany(newtodos, (error, docs) => {
            if (error) return done(error);
        });
    }).then(() => {
        done();
    }).catch((err) => {
        // console.log(err)
        done();
    });
}

module.exports = {
    addNewTodos,
    addNewUsers,
    newtodos,
    newusers
}