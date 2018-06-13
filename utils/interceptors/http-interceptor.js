var appConstants = require('../../helpers/constants.json');

var httpInterceptors = {
    respondWith: function (res, next, statusCode, result, error) {
        var responseObj = {};
        if (statusCode >= 200 && statusCode <= 299) {
            responseObj.succeeded = true;
            responseObj.result = result;
        } else {
            responseObj.succeeded = false;
            responseObj.reason = appConstants.statusCodes[statusCode.toString()] ? appConstants.statusCodes[statusCode.toString()] : result;
        }

        if (error) {
            return res.status(500).json({
                succeeded: false,
                reason: appConstants.statusCodes["500"]
            });
        }
        return res.status(statusCode).json(responseObj);
    }
};

module.exports = httpInterceptors;
