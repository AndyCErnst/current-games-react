window.app = window.app || {};
var $ = require('jquery'),
  _ = require('underscore'),
  Backbone = require('backbone');

module.exports = Backbone.View.extend({
  template: _.template($('#game-list-view').html()),
  events: {
    'click .game-view': 'showSingleGameView'
  },
  showSingleGameView: function(e){
    console.log(this.model);
    console.log('show list view');
    var id = this.model.id || this.model.cid;
    window.app.router.navigate('game/' + id, {trigger: true});
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
