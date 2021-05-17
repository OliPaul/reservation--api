const {CheckResource} = require("../reservation/use_case/CheckResource");
const {CheckDisponibility} = ("../reservation/use_case/CheckDisponibility");

var express = require('express');
var router = express.Router();


router.get('/:date/:resourceId', function(req, res, next) {
    const { date, resourceId } = req.params;

    //Call some use case to verify if resource is correct
    let checkResource = new CheckResource().execute(resourceId);

    if(!checkResource) return res.json({"available": false});

    let disponibility = new CheckDisponibility().execute(date, resourceId);

    if(!disponibility) return res.json({"available": false});
    
    return res.json({"available": true});
});

module.exports = router;
