var Users = require('../models/user_action');
var bcrypt = require('bcrypt'); 
var passport = require('passport');
var ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy;
var jwt = require('jsonwebtoken');

const user_registration_controller = (req, res) => {
    var users = new Users(req.body);

    checkEmail(users.email)
        .then(email => {
            hashPassword(users.password)
                .then((hashedPassword) => {
                    users.password = hashedPassword;
                    console.log(users.password);
                    users.save(users)
                        .then(() => {
                            res.status(200).json({ok: true, message: "Successfully Registered!"});
                        })
                        .catch(err => {
                            res.status(400).json({message: "unable to save to database"});
                        })
                })
        },

            error => {
                res.status(400).json({message: error});
        }
    )   
};

const checkEmail = email => {
    
    return new Promise((resolve, reject) => {
        var query = Users.find({email: email});
        query.exec((err, res) => {
            res.length > 0 ? reject("Email Address is already taken!") : resolve(email);
        })
    })
}

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
        err ? reject(err) : resolve(hash)
    })
    })
};

const login = (req, res) => {

    const users = new Users(req.body);

        findEmail(users.email)
            .then(matchUsers => {
                return findPassword(users.password, matchUsers)
                    .then(matchUsers => { 
                        var payload = matchUsers.id;
                        var token = jwt.sign(payload, 'HowIronic');
                        res.status(200).json({ok: true, message : "Login!" , token: token, 
                                              user: {
                                                  id: matchUsers.id,
                                                  email: matchUsers.email}
                                            });
                                        }, 
                         error => {
                            res.status(401).json({message: error})
                         })
                    .catch(error => {
                    res.status(401).json({message: errpr});
                    })
                },
                  error=> {
                    res.status(401).json({message: error})
                  }
            ).catch(error => {
            res.status(401).json({message: error});
            
        })   
};

const findEmail = email => {
    return new Promise((resolve, reject) => { 
        var query = Users.find({email: email});

        query.exec((err, matchUsers) => {
            matchUsers.length == 0 ? reject("No users found!") : resolve (matchUsers) 
        })

    })
};

const findPassword = (password, matchUsers) => {
    return new Promise((resolve, reject) => {
        matchUsers.map(users => {
            bcrypt.compare(password, users.password, (err, res) => {
                {
                    res == false ? reject("Password don't match!") : resolve(users)
                }
                return reject("Password don't match!");
            }
        )
        })
    })
};

const user_action = {
    user_registration_controller,
    login
};

module.exports = user_action;