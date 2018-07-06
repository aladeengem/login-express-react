var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var user_action = require('./routes/user_action_routes.js');
var Users = require('./models/user_action');

var passport = require('passport');
var ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy;


var app = express();

var mongoose = require('mongoose');

//MongoDB Configuration
mongoose.connect('mongodb://localhost:2909/testdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection Succesful');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'HowIronic';

var strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    var query = Users.find({id: jwt_payload.id});

    query.exec((err, matchUsers) => {
        matchUsers.length == 0 ? next(null, false) : next(null, matchUsers)
    })
});

passport.use(strategy);

app.use('/', passport.authenticate('jwt', {session : false }), (req, res) => {
  res.json({message: "Success! You can not see this without a token"});
});

app.use('/user', users);
app.use('/users', user_action);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
