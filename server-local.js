var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var bodyParser = require('body-parser');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json({ type: 'application/*+json' }))
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json({ limit: '80mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
var router = express.Router();

require('./routes/index')(router);

app.use('/api', router);

app.use((req, res, next)=> {
  next(createError(404));
});

var port = process.env.PORT || 8051;
app.listen(port);
console.log("Server started at port::"+port);


