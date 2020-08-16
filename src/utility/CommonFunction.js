function isEmpty(value) {
    if (typeof value == 'undefined' || typeof value == null) {
        return true;
    }
    else if (typeof value == 'object') {
        if (Array.isArray(value)) {
            return value.length > 0 ? false : true;
        } else {
            return Object.keys(value).length > 0 ? false : true;
        }
    }
    else if (typeof value == 'string') {
        return value.length > 0 ? false : true;
    }
    return false;
}

module.exports={
    isEmpty}