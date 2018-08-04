var ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy;
var Users = require('../models/user_action');


var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
jwtOptions.secretOrKey = 'HowIronic';

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
    console.log(jwt_payload);
    Users.find({_id: jwt_payload}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    } );
})
module.exports = strategy;