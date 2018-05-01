const fs = require("fs");
var _ = require("lodash");
const { ObjectID } = require("mongodb");

module.exports = function (app) {
    fs.readdirSync(__dirname).forEach(function (file) {
        if (file === "index.js" || file.substr(file.lastIndexOf('.') + 1) !== 'js')
            return;

        // var name = file.substr(0, file.indexOf('.'));
        var name = file;
        try{
            require('./' + name)(app, _, ObjectID);
            // console.log('../' + name);
        }catch(e){
            console.log("Exception occured while loading route file '" + name + "' " + e.message)
        }
    });
}