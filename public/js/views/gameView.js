window.app = window.app || {};
var $ = require('jquery'),
  _ = require('underscore'),
  Backbone = require('backbone');

module.exports = Backbone.View.extend({
  template: _.template($('#single-game-view').html()),
  events: {
    'click .edit-button': 'showEditView',
    'click .back-button': 'showListView'
  },
  showEditView: function(){
    window.app.router.navigate('game/edit/' + this.model.id, {trigger: true});
  },
  showListView: function(){
    window.app.router.navigate('/', {trigger: true});
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
