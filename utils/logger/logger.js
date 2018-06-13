var appConstants = require('../../helpers/constants.json');

var logger = {
    log: function(logData){
        if(appConstants.enableAppLogging) {
            console.log(logData);
        }
    },

    logHTTPRequest: function(req) {
        if(Object.keys(req.params).length > 0) this.log('Request - Params',req.params);
        if(Object.keys(req.query).length > 0) this.log('Request - Query', req.query);
        if(Object.keys(req.body).length > 0) this.log('Request - Body', req.body);
    }
};

module.exports = logger;
