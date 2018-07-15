var loopFn = function(i){
    for (l = 0; l < i*1e7; l++){
        
    }
}

// var sleep = require('sleep');

module.exports = function (app, _, ObjectID) {

    app.post("/sleep", (req, res) => {

        // sleep.sleep(5);
        loopFn(5);

    });


    app.get("/sleep", (req, res) => {

        loopFn(5);
        res.status(200).send("yo");

    });


    app.get("/sleep/:sec", (req, res) => {

        if (!req.params.sec) {
            res.status(400).send({ "error": "Request not valid." });
            return;
        };
     
        // sleep.sleep(req.params.sec||0);
        loopFn(req.params.sec)

        res.send({
            msg:`Done waiting for ${req.params.sec}`
        });
    
    });



}