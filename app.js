'use strict';

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var db = require('./controllers/db');
var logger = require('winston');


var app = express();

app.configure(function() {
  var onLocalHost = !process.env.OPENSHIFT_APP_DNS;
  var oneWeek = 604800000;
  if (onLocalHost) {
    logger.info('on local host, setting up environement variables from config.local');
    require('./config.local').setupEnvironmentVariables();
  }
  
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  
  app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
  
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('remodel united swine'));
  app.use(express.session({secret: 'yahoo quest waste', cookie: {maxAge: oneWeek * 3}}));
  
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

db.connectMongoose();

// Mount all the resource on /api prefix
var angularBridge = new (require('angular-bridge'))(app, {
  urlPrefix : '/api/v1/'
});

// With express you can password protect a url prefix :
//app.use('/api', express.basicAuth('admin', 'my_password'));

db.setupResources(angularBridge);

http.createServer(app).listen(app.get('port'), function(){
  logger.info("Express server listening on port " + app.get('port'));
});
