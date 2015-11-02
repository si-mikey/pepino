var Hapi = require('hapi');
var Server = new Hapi.Server();
var Yaml = require('yamljs').load('config/config.yml');
var Jade = require('jade');
var Path = require('path');
var Vision = require('vision');
var Inert = require('inert');

function env_config(config){
  if(process.env.ENV === 'prod'){
    return config.production;
  }else{
    return config.development;
  } 
}
var config = env_config(Yaml);

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
  path: '/',
  handler: function (request, reply){
    reply.view('create');
  }
});

Server.route({
  method: 'POST',
  path: '/api/scenario/send',
  handler: function (request, reply){
    request.reply(request.payload); 
  }
});





















Server.start(function(){
  console.log("Server Started on: " + Server.info.uri);
});

