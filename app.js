var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes');
var apisRouter = require('./routes/apis');

// Database
const db = require('./data/db');

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Error: ' + err))

var app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.use('/', indexRouter);
app.use('/api', apisRouter);



// Handle 404
app.use(function(req, res) {
 res.status(400);
res.render('404.pug', {title: '404: File Not Found'});
});

// Handle 500
app.use(function(error, req, res, next) {
  res.status(500);
res.render('500.pug', {title:'500: Internal Server Error', error: error});
});

module.exports = app;
