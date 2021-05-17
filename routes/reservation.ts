const {CheckResource} = require("../reservation/use_case/CheckResource");
const {CheckAvailability} = require("../reservation/use_case/CheckAvailability");

var express = require('express');
var router = express.Router();


router.get('/:date/:resourceId', async function(req: any, res: any, next: any) {
    const { date, resourceId } = req.params;

    // Call Resources use case to verify if resource is correct
    let resource = new CheckResource().execute(resourceId);
    if(!resource){
        return res.json({"available": false});
    }

    // Call Availability service to verify if resource is available
    let availability = new CheckAvailability();
    const isAvailable: boolean = await availability.execute(date, resourceId)
    if(!isAvailable) {
        return res.json({"available": false});
    }

    return res.json({"available": true});
});

module.exports = router;
