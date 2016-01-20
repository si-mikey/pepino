var Hapi = require('hapi');
var Server = new Hapi.Server({debug: {request: ['error']}});
var Config  = require('yamljs').load('config/config.yml');
var Jade = require('jade');
var Path = require('path');
var Vision = require('vision');
var Inert = require('inert');
var Scenario = require('./lib/controllers/scenarios.js');


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
  path: '/create',
  handler: function (request, reply){
    reply.view('create');
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

