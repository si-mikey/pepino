var Hapi = require('hapi');
var Server = new Hapi.Server({debug: {request: ['error']}});
var config = require('./config/config.js');
var Jade = require('jade');
var Path = require('path');
var Vision = require('vision');
var Inert = require('inert');
var db = require('./lib/db/database.js');
var Users = require('./lib/models/users.js');
var Scenarios = require('./lib/models/scenarios.js');
var _ = require("lodash");

Server.connection({port: config.server.port});

Server.register(Vision, function(err){
  if(err)
    throw err;
});

Server.register(Inert, function(err){
  if(err)
    throw err;
});

Server.register({
  register: require('yar'),
  options: {
    storeBlank: false,
    cookieOptions: {
      password: process.env.SESSION_KEY,
      isSecure: false
    }
  }
}, function(err) { if (err) console.error(err) });

Server.views({
  engines: {
    jade: Jade
  },
  relativeTo: __dirname + '/lib',
  path: 'views',
  isCached: process.env.ENV === 'prod'
});

Server.route({
  method: 'GET',
  path: '/public/{path*}',
    handler: {
      directory: {
        path: Path.join(__dirname + '/public'),
        listing: false,
        index: false,
        redirectToSlash: false
      }
    } 
});

function isAuthenticated(req){
  if(req.yar.get("user")){
    return true;
  }else{
    return false;
  } 
};

Server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply){
      reply.redirect('/create');
    }
});

Server.route({
  method: 'GET',
  path: '/create',
  handler: function (request, reply){
    if(isAuthenticated(request)){
      reply.view('create', {user: request.yar.get('user')});
    }else{
      reply.redirect('/login');
    }
  }
});

Server.route({
  method: 'GET',
  path: '/login',
  handler: function (request, reply){
    if(!isAuthenticated(reqest)){ 
      reply.view('login');
    }else{
      reply.redirect('/');
    }
  }
});

Server.route({
  method: 'GET',
  path: '/queue',
  handler: function (request, reply){
    if(isAuthenticated(request)){
     // Scenario.model.find(function(err, scenarios){
     //   if (err) return console.error(err);
     //   reply.view('queue', {scenarios: scenarios}); 
     // });
    }else{
      reply.redirect("/login");
    }
  }
});

// API ROUTES 
Server.route({
  method: 'POST',
  path: '/api/auth',
  handler: function (request, reply){
    var email = request.payload.email;
    var password = request.payload.password;
    Users.findByLogin (email, password, function(user){
      var user = _.first(user);
      if(user !== undefined){
        request.yar.set('user', user);
        reply("Login Success!").code(200);
      }else{
        reply("User not found!").code(404);
      }
    });
  }
});

Server.route({
  method: 'POST',
  path: '/api/scenario/send',
  handler: function (request, reply){
    if(isAuthenticated(request)){
      if (request.payload !== null){
        var scenarioObject = {};
        scenarioObject.author = request.yar.get("user").email;
        scenarioObject.mod_by = request.yar.get("user").email;
        scenarioObject.active = true;
        Scenarios.save(request.payload, function(result){
          console.log(typeof result);
        });
      }
    }else{ reply("Not Authenticated").code(403) }
  }
});

Server.route({
  method: 'GET',
  path: '/api/scenario/findBy/{id}',
  handler: function (request, reply){
   // Scenario.findById(request.params.id, function(err, scenario){
   //   if (err) console.error(err);
   //   reply(scenario).code(200);
   // });
   }
});

Server.route({
  method: 'GET',
  path: '/logout',
  handler: function (request, reply){
    request.yar.reset('user');
    reply.redirect('/login');
  }
});




Server.start(function(){
  console.log("Server Started on: " + Server.info.uri);
});

