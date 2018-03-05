var request = require('request');
var express = require('express');
var app = express();
const xmlQuery = require('xml-query');
const XmlReader = require('xml-reader');
var Promise = require('promise');
var createMeeting=require('./createmeeting');

app.get("/", function (req, res) {
    SendMeeting().then(function (result) {
        res.end("success");
    }).catch(function (errdata) {
        res.end(errdata);
        console.log(errdata)
    })
})

app.listen(process.env.PORT, function (err) {
    console.log(err);
})


