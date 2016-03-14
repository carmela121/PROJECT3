var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var router = require('./config/routes');

mongoose.connect('mongodb://localhost/project3');

