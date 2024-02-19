var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require('dotenv').config({ path:'./example.env' });

var usersRouter = require('./routes/users');
const userContentRouter = require('./routes/usercontent');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/users', usersRouter);
app.use('./content', userContentRouter);

module.exports = app;
