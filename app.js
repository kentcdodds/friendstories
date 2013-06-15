'use strict';

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
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
  
  var homeDir = process.env.OPENSHIFT_REPO_DIR;
  console.log('homeDir is ' + homeDir);

  app.set('port', process.env.OPENSHIFT_NODEJS_PORT);
  app.set('views', homeDir + 'views');
  app.set('view engine', 'jade');
  
  app.use(express.favicon(homeDir + 'public/img/favicon.ico'));
  
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('remodel united swine'));
  app.use(express.session({secret: 'yahoo quest waste', cookie: {maxAge: oneWeek * 3}}));
  
  app.use(app.router);
  app.use(require('less-middleware')({ src: homeDir + 'public' }));
  
  app.use(express.static(path.join(homeDir, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

app.use('/protected', express.basicAuth('admin', '3quietKittens!'));
app.get('/protected/:operation', function(req, res) {
  var operation = req.params.operation;
  var opFunction = require('./common/ResetDatabase')[operation];
  if (opFunction) {
    opFunction();
  }
  res.send('Operation started!');
});

db.connectMongoose();

// Mount all the resource on /api prefix
var angularBridge = new (require('angular-bridge'))(app, {
  urlPrefix : '/api/v1/'
});

// With express you can password protect a url prefix :
//app.use('/api', express.basicAuth('admin', 'my_password'));

db.setupResources(angularBridge);

var port = app.get('port');
var ipAddress = process.env.OPENSHIFT_NODEJS_IP;
console.log('The port is: ' + port);
console.log('The ip address is: ' + ipAddress);

console.log('beginning to listen on the port');
app.listen(port, ipAddress, function() {
  logger.info(Date(Date.now()) + ': Node server started on ' + ipAddress + ':' + port);
});
