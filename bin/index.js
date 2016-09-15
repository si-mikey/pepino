var Hapi = require('hapi');
var Server = new Hapi.Server({debug: {request: ['error']}});
var Jade = require('jade');
var Path = require('path');
var Vision = require('vision');
var Inert = require('inert');
var _ = require("lodash");
var config = require('../../config/config');
const Users = require('../../lib/models/users');

////////// APP CONFIG //////////
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
  relativeTo: process.cwd() + '/lib',
  path: 'views',
  isCached: process.env.ENV === 'prod'
});

Server.route({
  method: 'GET',
  path: '/public/{path*}',
    handler: {
      directory: {
        path: Path.join(process.cwd() + '/public'),
        listing: false,
        index: false,
        redirectToSlash: false
      }
    } 
});

Server.ext('onRequest', Authenticated);
////////// APP CONFIG //////////


function Authenticated(request, reply){
  const path = request.path;
  if(path == '/create' || path == '/queue' || path == 'manage') {
    try {
      if(request.yar.get('user') !== undefined) {
        reply.continue();
      } else {
        reply.redirect('/login');
      }
    } catch (err) {
      console.log(err);
      reply.redirect('/login');
    }
  } else { 
    reply.continue();
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
  path: '/login',
  handler: function (request, reply){
    reply.view('login');
  }
});


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
  method: 'GET',
  path: '/create',
  handler: function (request, reply){
    reply.view('create', {user: request.yar.get('user')});
  }
});


Server.route({
  method: 'GET',
  path: '/queue',
  handler: function (request, reply){
  }
});


Server.route({
  method: 'POST',
  path: '/api/scenario/send',
  handler: function (request, reply){
  }
});


Server.route({
  method: 'GET',
  path: '/api/scenario/findBy/{id}',
  handler: function (request, reply){
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

