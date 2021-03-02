
require('dotenv').config();



var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const registerHelpers = require('./loaders/hbs');

var privateRouter = require('./routes/private');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');


var app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'never walk alone again',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 600000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    //ttl: 24 * 60 * 60
  })
}));

app.use((req, res, next) => {
  if (req.session.currentUser) {
    res.locals.currentUserInfo = req.session.currentUser;
    res.locals.isUserLoggedIn = true;
  } else {
    res.locals.isUserLoggedIn = false;
  }
  next();
});
// HBS helpers
registerHelpers(hbs);

hbs.registerPartials(path.join(__dirname, 'views/partials'));


app.use('/private', privateRouter);
app.use('/', indexRouter);
app.use('/', authRouter);

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
