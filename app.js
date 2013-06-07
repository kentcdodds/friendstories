var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('remodel united swine'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

mongoose.connect('mongodb://localhost/pizza');

// Mount all the resource on /api prefix
var angularBridge = new (require('angular-bridge'))(app, {
  urlPrefix : '/api/'
});

// With express you can password protect a url prefix :
app.use('/api', express.basicAuth('admin', 'my_password'));

// Expose the pizzas collection via REST
angularBridge.addResource('pizzas', db.Pizza);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
