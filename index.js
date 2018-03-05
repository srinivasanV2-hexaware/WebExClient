var express = require('express');

var app = express();
var CreateMeeting = require('./createmeeting');

app.get("/", function (req, res) {
    CreateMeeting.SendMeeting('Nuance Meeting','LKV Cabin', '', ['ursfriendly_sri@yahoo.com','38238.hexaware@gmail.com'], '2018-03-06,05:00:00', '2018-03-06,05:30:00','session').then(function (result) {
        res.end("success");
    }).catch(function (errdata) {
        res.end(errdata);
        console.log(errdata)
    })
})

app.listen(process.env.PORT, function (err) {
    console.log(err);
})


