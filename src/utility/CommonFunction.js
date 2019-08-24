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

function createJsonResponse(statusCode , value){
        let result={};
        if(isEmpty(statusCode)){
            console.error("Status code is not present");
            return; 
        }
        if(isEmpty(value)){
            console.error("value or message field not present");
            return;
        }

        result['status'] = statusCode;
        result['value'] = value;

        return result;
}

module.exports={
    isEmpty,
    createJsonResponse
}