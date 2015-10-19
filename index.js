var Hapi = require('hapi');
var server = new Hapi.Server();


server.connection({port: 3000});
server.start(function(){
  console.log(server);
});


