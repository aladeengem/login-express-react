var express = require('express');
var router = express.Router();
var user_action = require('../controllers/user_action');

router.get('/', (req, res) => {
   res.send('Welcome to Registration');
})

router.post('/registration', user_action.user_registration_controller );

router.post('/authentication', user_action.login);


module.exports = router;