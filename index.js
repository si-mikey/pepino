var Hapi = require('hapi');
var Server = new Hapi.Server();
var Yaml = require('yamljs').load('config/config.yml');
var Jade = require('jade');
var Path = require('path');

function env_config(config){
  if(process.env.ENV === 'prod'){
    return config.production;
  }else{
    return config.development;
  } 
}
var config = env_config(Yaml);

Server.connection({port: config.server.port});

Server.register(require('vision'), function(err){
  if(err)
    throw err;
});

Server.views({
  engines: {
    jade: Jade
  },
  path: Path.join(__dirname, '/lib/views'),
  isCached: process.env.ENV === 'prod'
});



Server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply){

  }
});























Server.start(function(){
  console.log("Server Started on: " + Server.info.uri);
});

