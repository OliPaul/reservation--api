"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckResource = void 0;
var CheckResource = /** @class */ (function () {
    function CheckResource() {
    }
    CheckResource.prototype.execute = function (resourceId) {
        if (resourceId != 1337) {
            return false;
        }
        return true;
    };
    return CheckResource;
}());
exports.CheckResource = CheckResource;
