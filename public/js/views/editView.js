window.app = window.app || {};
var $ = require('jquery'),
  _ = require('underscore'),
  Backbone = require('backbone');

module.exports = Backbone.View.extend({
  template: _.template($('#edit-game-view').html()),
  events: {
    'click .add-player': 'addPlayer',
    'click .remove-player': 'removePlayer',
    'click .back-button': 'showGameView'
  },
  addPlayer: function(){
    this.model.set('currentPlayers', this.model.get('currentPlayers') + 1);
    this.model.save();
  },
  removePlayer: function() {
    this.model.set('currentPlayers', this.model.get('currentPlayers') - 1);
    this.model.save();
  },
  showGameView: function() {
    window.app.router.navigate('game/' + this.model.id, {trigger: true});
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
