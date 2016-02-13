// server.js

// BASE SETUP
// ============================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


// ROUTES
// ========================
var router = express.Router();

// all requests
router.use(function(req, res, next) {
    console.log('request made');
    next();
});


app.get('/', function(req, res) {
    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    var os = req.headers['user-agent'];
    var lang = req.headers["accept-language"];
    res.json({ "ip": ip, "OS": os, "language": lang });
})


app.use('/', router);

// START SERVER
// ===================
app.listen(port);
console.log('server is running on port: ' + port);