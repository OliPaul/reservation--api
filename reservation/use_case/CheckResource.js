const checkResource = (resourceId) => {
    // Compare with int
    if (resourceId != 1337) {
        return false;
    }
    return true;
}

module.exports = {
    checkResource
}
