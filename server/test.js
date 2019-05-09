var tools = require('./tools');
var events = require('events');
var util = require('util');

var fs = require('fs');

var script = fs.readFile("../static/script.js", 'utf8', function(err, data){
    // fs.writeFile('../errors_log.txt', data+"/n", function(err, data){});
    //script = "dewd";
    //console.log(data);
});
console.log(script);
var print = function() {
    console.log("hi bro");
    console.log(tools.arraySize([5, 6, 7, 3, 3]));
