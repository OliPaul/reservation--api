var express = require('express');
const {checkAvailability} = require("../reservation/use_case/CheckDisponibility");
const {checkResource} = require("../reservation/use_case/CheckResource");
var router = express.Router();

router.get('/:date/:resourceId', async function (req, res, next) {
    const {date, resourceId} = req.params;

    // Call Resources use case to verify if resource is correct
    let resource = checkResource(resourceId);
    if (!resource) {
        return res.json({"available": false});
    }

    // Call Availability service to verify if resource is available
    let availability = await checkAvailability(date, resourceId);
    if (!availability) {
        return res.json({"available": false});
    }

    return res.json({"available": true});
});

module.exports = router;
