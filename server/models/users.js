var mongoose = require("mongoose");
var validator = require("validator");

var users = mongoose.model("users", {
    // name: {
    //     required: true,
    //     type: String,
    //     minlength: 1,
    //     trim: true
    // },
    email: {
        required: true,
        type: String,
        minlength: 1,
        trim: true,
        unique: [true, "Email is already registered."],
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not a valid email."
        }
    },
    password:{
        required:true,
        type:String,
        minlength:6,
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]           
});

module.exports = {
    users,
    mongoose
}

var saveFn = function (m) {
    m.save().then((doc) => {
        console.log("saved todo.")
    }, (err) => {
        console.log(err)
    });
}
