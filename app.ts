const http = require("http");

var express = require('express');
var indexRouter = require('./routes/reservation');
var app = express();

require("dotenv").config();

app.use(express.json());
app.use('/', indexRouter);

var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);
server.listen(port);


