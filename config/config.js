var config = require('yamljs').load(__dirname + '/config.yml');

function env_config(config){
  if(process.env.ENV === 'prod'){
    return config.production;
  }else{
    return config.development;
  } 
}

module.exports = env_config(config);


