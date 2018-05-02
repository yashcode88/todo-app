var mongoose = require("mongoose");
var validator = require("validator");
var _ = require("lodash");
var jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema({
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

userSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = "auth";
    lineNo();
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, "abc123").toString();
    lineNo();

    user.tokens.push({access, token});
    lineNo();

    // return token;
    return user.save().then(() => {
        return token;
    }).catch((e) => {
        console.log(e)
    })

};


userSchema.methods.generateAuthToken1 = function () {
    var user = this;
    var access = 'auth';
    // var token = jwt.sign({_id: user._id.toHexString(), access}, "abc123").toString();
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, "abc123").toString();
    // user.tokens.push({access, token});
  


    // return user.save().then(() => {
    //   return token;
    // });
    return user.save().then(() => {
        return token;
    }).catch((e) => {
        console.log(e)
    })    
  };

userSchema.methods.toJSON = function () {
    var user = this;
    var userObj = user.toObject();
    return _.pick(userObj, ["_id", "email"])
}

var users = mongoose.model("users", userSchema);

module.exports = {
    users,
    mongoose
}
