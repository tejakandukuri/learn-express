var router = require('express').Router();
var authModule = require('../../utils/auth/auth.js');
var interceptors = require('../../utils/interceptors/http-interceptor.js');

router.get('/module1', authModule.isUserAuthorized("ROLE_DASHBOARD_RO"), function(req, res, next){
    var msg = "Hey Welcome! you are able to see this page as your login was successful and you have access to this module";
    interceptors.respondWith(res, next, 200, msg);
});

module.exports = router;
