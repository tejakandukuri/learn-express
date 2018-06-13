var router = require('express').Router();
var authModule = require('./utils/auth/auth.js');
var logger = require('./utils/logger/logger.js');
var fs = require('file-system');

router.use(function(req, res, next){
    if (req.url.indexOf("/login") > -1 || req.url.indexOf("/logout") > -1 || req.url.indexOf("/signup") > -1) {
        logger.log("login / logout request");
        next();
    } else {
        authModule.isUserLoggedIn(req, res, next);
    }
});

fs.recurseSync(require("path").join(__dirname, "routes"), function(filepath, relative, filename) {
    if (!filename) return;
    router.use(require('./routes/' + relative));
});

module.exports = router;
