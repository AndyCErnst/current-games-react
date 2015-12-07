window.app = window.app || {};
var $ = require('jquery'),
  Backbone = require('backbone'),
  _ = require('underscore'),
  Game = require('./models/game'),
  GameView = require('./views/gameView'),
  EditView = require('./views/editView'),
  GameCollectionView = require('./views/gameCollectionView');


var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'game/:id':'showGame',
    'game/edit/:id':'editGame',
    'search/:term': 'search'
  },
  self: this,
  currentView: '',
  initialize: function() {
    this.collection = window.app.gameCollection;
    // _.bindAll(this, 'fetchAndRender');
  },
  showPage: function(view) {
    console.log('showing ');
    console.log(view);
    if(this.currentView) {
      this.currentView.remove();
    }
    $('#app-content').append(view.render().el);
    this.currentView = view;
  },
  getAndShow: function(Model, View, id) {
    var self = this;
    var model = this.collection.get(id);
    if(model) {
      var view = new View({model: model});
      self.showPage(view);
    } else {
      model = new Model(id);
      model.on('change', function() {
        model.off('change');
        var view = new View({model: model});
        self.showPage(view);
      });
      model.fetch();
    }
  },
  index: function() {
    var gameColView = new GameCollectionView({collection: this.collection});
    this.showPage(gameColView);
  },
  showGame: function(id) {
    this.getAndShow(Game, GameView, id);
  },
  editGame: function(id) {
    this.getAndShow(Game, EditView, id);
  },
  search: function(term) {
    console.log('search registered for ' + term);
    console.log('method not implemented');
  }
});

module.exports = Router;
