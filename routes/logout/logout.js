var router = require('express').Router();

router.get('/logout', function(req, res, next){
    req.session.destroy();
    res.send('logout success');
});

module.exports = router;
