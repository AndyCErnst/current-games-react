var path = require('path');
var rootPath = path.normalize(__dirname+'/../../');

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://andycernst:password@ds029640.mongolab.com:29640/games-display',
    port: process.env.port || 4000
  },
  production: {
    rootPath: rootPath,
    db: 'mongodb://andycernst:password@ds029640.mongolab.com:29640/games-display',
    port: process.env.port || 80

  }
}
