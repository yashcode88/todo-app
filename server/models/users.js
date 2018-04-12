var mongoose = require("mongoose");

var users = mongoose.model("users", {
    name: {
        required: true,
        type: String,
        minlength: 1,
        trim: true
    },
    email: {
        required: true,
        type: String,
        minlength: 1,
        trim: true,
        unique:true
    }
});

module.exports = {
    users,
    mongoose
}

var saveFn = function(m){
    m.save().then((doc) => {
        console.log("saved todo.")
    }, (err) => {
        console.log(err)
    });
}
