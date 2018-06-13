var router = require('express').Router();
var interceptors = require('../../utils/interceptors/http-interceptor.js');
var mongodb = require('../../utils/dbconnection/dbconnector.js');

router.get('/login', function(req, res, next){
    if(!req.query.phone || !req.query.password){
        interceptors.respondWith(res, next, 200, "Invalid username & password");
    } else {
        mongodb.queryBy("users", {"phone": req.query.phone, "password": req.query.password}).then(function (result) {
            if(result[0]) {
                req.session.user = result[0].phone;
                req.session.role = result[0].role;
                interceptors.respondWith(res, next, 200, result[0]);
            } else {
                interceptors.respondWith(res, next, 200, "Invalid username & password");
            }
        });
    }
});

module.exports = router;
