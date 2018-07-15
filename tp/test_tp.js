function* generator() {
    console.log(1);
    yield 1;
    console.log(2)
    yield 2;
}

var gen = generator();


var port = 5000;

const { ObjectID } = require("mongodb");
var express = require("express");
var app = express();
var { test1 } = require("./test1.js");

app.use(function (req, res, next) {
    req.id = new ObjectID().toHexString().substr(-4);
    next();
});

app.get("/clear", (req, res, next) => {
    console.clear();
    console.log("******************** log cleared ********************")
    res.status(200).send({});
});

app.get("/loop", (req, res, next) => {

    console.log("Starting loop")

    var whileLoop = function (max) {
        var i = 0;
        function blockFunc() {
            i++;
            if ((i % (max / 100)) == 0) console.log("reached ", i);
            if (i < max) {
                setTimeout(blockFunc, 0);
            } else {
                console.log("done looping.")
                res.status(200).send({ i });
            }
        }
        blockFunc();
    }
    whileLoop(1e5);

});

app.get("/test1", (req, res) => {
    test1();
    console.log(new Date(), `${req.id}`);
    res.status(200).send({});
});


app.get("/users", (req, res, next) => {
    var del = parseInt(Math.random() * 1e3);
    console.log(new Date(), `${req.id} in ${del} ms`);
    setTimeout(() => {
        res.status(200).send({});
        console.log(new Date(), `${req.id} out ${del} ms`);
    }, del)
});

app.listen(port, () => {
    console.log(`Server started no port ${port}...`);
})

// var val;
// console.log(gen.next())
// console.log(gen.next())
// console.log(gen.next())


// console.log("started...")
// var bcrypt = require("bcryptjs");

// var doShit = function () {
//     bcrypt.genSalt(31, (err, res) => { console.log("res = " + res) })
// }

// // setTimeout(() => {
// //     // for ( var i = 0; i< 1e10; i++ ){}
// //     bcrypt.hashSync("string to hash",15,(err,res) => { 
// //         console.log("res = " + res) 
// //     })
// //     console.log("done looping.")
// //     // console.log(new Error().stack)
// // },0);

// setTimeout(() => {
//     // console.log("Done waiting 0s.")
//     // console.log(new Error().stack)
//     // for (var i = 0; i < 1e12; i++) { }
//     console.log("setTimeout")
// }, 0);

// setImmediate(() => {
//     console.log("set Immediate.")
//     // console.log(new Error().stack)
// });

// process.nextTick(() => {
//     console.log("process.nextTick.")
// })

// // var loopAsync = () =>{
// //     return new Promise((resolve, reject) => {
// //         setTimeout(() => {
// //             for ( var i = 0; i< 1e9; i++ ){}
// //             // reject("done")
// //             throw new Error("fatts")
// //         }, 0)
// //     });
// // }

// // loopAsync().then((res) => {
// //     console.log("inside then res " + res);
// // }, (err) => {
// //     console.log("inside then err " + err);
// // }).catch((err) => {
// //     console.log("inside catch err " + err);
// // })

// var calcAvgTime = function (label, iterations, fn) {
//     var i, t1, t2;

//     var timings = [];
//     for (i = 0; i < iterations; i++) {
//         t1 = new Date();
//         fn();
//         timings.push(new Date() - t1);
//     }

//     console.log(`Average time taken (${label}) = ${timings.reduce((d, sum) => { sum = (sum || 0) + d; return sum }) / timings.length}`)
// }

console.log("Done.")
