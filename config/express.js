// var express = require('express');

// module.exports = function() {
//   var app = express();
//   require('../app/routes/index.server.routes.js')(app);
//   return app;
// };


var showdown  = require('showdown'),
  config = require('./config'), 
  express = require('express'),
  morgan = require('morgan'),
  compress = require('compression'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  //consolidate template engine
  cons = require('consolidate'),
  flash = require('connect-flash'),
  session = require('express-session'),
  passport = require('passport');


 


module.exports = function() {
  var app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());



   app.use(session({
      saveUninitialized: true,
      resave: true,
      secret: config.sessionSecret
    }));


  app.set('views', './app/views');
  app.set('view engine', 'ejs');


  // swig引擎似乎不能支持AngularJS Authentication
  // app.engine('.html', cons.swig);
  // app.set('view engine', 'html');



  app.use(express.static('./public'));


  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  
  require('../app/routes/index.server.routes.js')(app);
  require('../app/routes/articles.server.routes.js')(app);
  require('../app/routes/users.server.routes.js')(app);



   require('../app/routes/tasks.server.routes.js')(app);

  return app;
};