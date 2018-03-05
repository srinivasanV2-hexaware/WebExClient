var express = require('express');
var app = express();
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


