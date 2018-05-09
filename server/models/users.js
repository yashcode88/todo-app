var mongoose = require("mongoose");
var validator = require("validator");
var _ = require("lodash");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema({
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
    password: {
        required: true,
        type: String,
        minlength: 6,
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = "auth";
    lineNo();
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, "abc123").toString();
    lineNo();

    user.tokens.push({ access, token });
    lineNo();

    // return token;
    return user.save().then(() => {
        return token;
    }).catch((e) => {
        console.log(e)
    })

};

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObj = user.toObject();
    return _.pick(userObj, ["_id", "email"])
}

UserSchema.statics.findByToken = function (token) {
    var user = this;
    var decoded;

    try {
        decoded = jwt.verify(token, "abc123");
    } catch (e) {
        return Promise.reject();
    }

    return user.findOne({
        _id: decoded._id,
        "tokens.token": token,
        "tokens.access": "auth"
    });

}

UserSchema.pre("save", function (next) {
    var user = this;

    lineNo();
    if (user.isModified("password")) {
        lineNo();
        var p1 = bcrypt.genSalt(10, (err, salt) => {
            lineNo();
            var p1 = bcrypt.hash(user.password, salt, (err, hash) => {
                lineNo();
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
    lineNo();
})

var users = mongoose.model("users", UserSchema);

module.exports = {
    users,
    mongoose
}
