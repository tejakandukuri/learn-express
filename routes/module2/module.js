var router = require('express').Router();
var authModule = require('../../utils/auth/auth.js');
var interceptors = require('../../utils/interceptors/http-interceptor.js');

router.get('/module2', authModule.isUserAuthorized("ROLE_SETTINGS_RO"), function(req, res, next){
    var msg = "sorry, you don't have permissions to view this page";
    interceptors.respondWith(res, next, 200, msg);
});

router.post('/module2', authModule.isUserAuthorized("ROLE_SETTINGS_RO"), function(req, res, next){
    var msg = {"firstName": "Ravi", "lastName": "Hi "+ req.body.lastName};
    interceptors.respondWith(res, next, 200, msg);
});

module.exports = router;
