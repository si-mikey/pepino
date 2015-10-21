var Hapi = require('hapi');
var Server = new Hapi.Server();
var YAML = require('yamljs').load('config/config.yml');

function env_config(config){
  if(process.env.ENV === 'prod'){
    return config.production;
  }else{
    return config.development;
  } 
}
var config = env_config(YAML);

Server.connection({port: config.server.port});


Server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply){
    reply('YESSSSSS');
    console.log(reply);
  }
});






Server.start(function(){
  console.log("Server Started on: " + Server.info.uri);
});

