var Backbone = require('backbone');
var GameModel = require('./game');

module.exports = Backbone.Collection.extend({
  model: GameModel,
  url: '/api/games',
  comparator: 'date'
});
