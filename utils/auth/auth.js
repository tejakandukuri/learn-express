var appConstants = require('../../helpers/constants.json');
var httpInterceptors = require('../interceptors/http-interceptor.js');

var auth = {

    isUserLoggedIn: function(req, res, next) {
        if(req.session.user){
            return next();
        } else {
            httpInterceptors.respondWith(res, next, 401);
        }
    },

    isUserAuthorized: function(permission) {
        return function(req, res, next) {
            if(req.session.user && appConstants["roles_permissions"][req.session.role].indexOf(permission) > -1){
                return next();
            } else {
                httpInterceptors.respondWith(res, next, 403);
            }
        }
    }

};

module.exports = auth;
