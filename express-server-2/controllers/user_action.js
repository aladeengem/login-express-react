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

                    users.save(users)
                        .then(() => {
                            res.status(201).redirect('/users');
                        })
                        .catch(err => {
                            res.status(400).send("unable to save to database");
                        })
                })
        },

            reject => {
                res.status(400).send(reject);
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
                        console.log(token);
                        res.status(200).send({as : "Login!"})
                    
                    }, 
                    error => {
                        res.status(401).send(error)
                    })

                .catch(err => {
                        console.log(err);
                })
            },
                error=> {
                    res.status(401).send(error)
                }
        )   
};

const findEmail = email => {
    return new Promise((resolve, reject) => { 
        var query = Users.find({email: email});

        query.exec((err, matchUsers) => {
            matchUsers.length == 0 ? reject() : resolve (matchUsers) 
        })

    })
};

const findPassword = (password, matchUsers) => {
    return new Promise((resolve, reject) => {
        matchUsers.map(users => {
            bcrypt.compare(password, users.password, (err, res) => {
                {
                    res == false ? 
                    reject("Password Don't Match! ") : resolve(users)
                }
                return reject("Password Don't Match! ");
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