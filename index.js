var Hapi = require('hapi');
var Server = new Hapi.Server({debug: {request: ['error']}});
var Config  = require('yamljs').load('config/config.yml');
var Jade = require('jade');
var Path = require('path');
var Vision = require('vision');
var Inert = require('inert');
var Scenario = require('./lib/controllers/scenarios.js');
var Users = require('./lib/controllers/users.js');


function env_config(config){
  if(process.env.ENV === 'prod'){
    return config.production;
  }else{
    return config.development;
  } 
}
var config = env_config(Config);

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


Server.route({
  method: 'GET',
  path: '/login',
  handler: function (request, reply){
    reply.view('login'); 
  }
});

Server.route({
  method: 'POST',
  path: '/api/doLogin',
  handler: function (request, reply){
    var email = request.payload.email;
    var password = request.payload.password;
    console.log(request.payload);
    Users.findByEmailAndPassword(email, password, function(err, user){
      if (err) return console.error(err);
      if(user !== null){
        request.yar.set('user', user);
        reply("Login Success!").code(302);
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
    reply.view('create');
  }
});


Server.route({
  method: 'POST',
  path: '/api/scenario/send',
  handler: function (request, reply){
    console.log(request.payload);
    if (request.payload !== null){
      var scenarioObject = {};
      scenarioObject.scenario = request.payload;
      scenarioObject.author = 'Luis';
      scenarioObject.mod_by = 'Luis';
      scenarioObject.active = true; 
      Scenario.save(scenarioObject, function(err, result){
        if (err){
          reply("Scenario save error: " + result).code(400);
        }else{
          reply("Scenario Saved").code(200);
        }
      })
    }
  }
});



















Server.start(function(){
  console.log("Server Started on: " + Server.info.uri);
});

