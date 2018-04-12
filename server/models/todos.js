var mongoose = require("mongoose");

var todos = mongoose.model("todos", {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Number,
        default: 0
    },
    completedAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = {
    todos,
    mongoose
}