var config = require('yamljs').load(__dirname + '/config.yml');

const env = process.env.ENV;
module.exports = (env === 'prod') ? config.production : config.development; 


