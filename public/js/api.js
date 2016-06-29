'use strict';
var $ = require('jquery');

var api = {
  // single game
  getGame: function(id) {
    return $.get('/api/games/' + id);
  },
  deleteGame: function(id) {
    return $.ajax({
        url: '/api/games/' + id,
        method: 'delete'
      });
  },
  saveGame: function(id, data) {
    return $.ajax({
        url: '/api/games/' + id,
        method: 'put',
        data: data
      });
  },
  // multiple games
  getGames: function(){
    return $.get('/api/games');
  },

};


module.exports = api;
