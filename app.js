var CheckResource = require("./reservation/use_case/CheckResource").CheckResource;
var CheckDisponibility = require("./reservation/use_case/CheckDisponibility").CheckDisponibility;
var http = require("http");
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/:date/:resourceId', function (req, res, next) {
    var _a = req.params, date = _a.date, resourceId = _a.resourceId;
    //Call some use case to verify if resource is correct
    var checkResource = new CheckResource().execute(resourceId);
    if (!checkResource)
        return res.json({ "available": false });
    var disponibility = new CheckDisponibility().execute(date, resourceId);
    if (!disponibility)
        return res.json({ "available": false });
    return res.json({ "available": true });
});
var port = process.env.PORT || '3000';
app.set('port', port);
/**
 * Create HTTP server.
 */
var server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
