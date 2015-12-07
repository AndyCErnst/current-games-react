var $ = require('jquery'),
  _ = require('underscore'),
  Backbone = require('backbone'),
  GameListItemView = require('./gameListItemView');

module.exports = Backbone.View.extend({
  initialize: function() {
    this.collection.on('add', this.addGame, this);
    this.collection.on('reset', this.addAll, this);
    _.bindAll(this, 'addGame', 'addAll');
  },
  addGame: function(game) {
    var itemView = new GameListItemView({model: game});
    this.$el.append(itemView.render().el);
  },
  addAll: function() {
    this.collection.forEach(this.addGame);
  },
  render: function() {
    this.addAll();
    return this;
  }
});
