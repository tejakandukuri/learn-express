var router = require('express').Router();
var interceptors = require('../../utils/interceptors/http-interceptor.js');
var mongodb = require('../../utils/dbconnection/dbconnector.js');
var appConstants = require('../../helpers/constants.json');

router.post('/signup', function(req, res, next){
    var signUpObj = req.body;
    if(!signUpObj.password || !signUpObj.phone){
        interceptors.respondWith(res, next, 400, appConstants.errorMessages.signup_failed);
    } else {
        mongodb.queryBy("users", {phone: signUpObj.phone}).then(function(result){
           // console.log(result);
            if(!result[0]){
                mongodb.insertOne("users", signUpObj).then(function(userCreated){
                    if(userCreated.result.ok){
                        interceptors.respondWith(res, next, 200, "user created successfully");
                    } else {
                        interceptors.respondWith(res, next, 500);
                    }
                });
            } else {
                interceptors.respondWith(res, next, 200, "user already exists with this number ");
            }

        });
    }
});

module.exports = router;
