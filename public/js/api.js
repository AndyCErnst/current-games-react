'use strict';
var $ = require('jquery');

var api = {
  getGame: function(id) {
    return $.get('/api/games/' + id);
  },
  deleteGame: function(id) {
    return $.ajax({
        url: '/api/games/' + id,
        method: 'delete'
      });
  },
  getGames: function(){
    return $.get('/api/games');
  },

};


module.exports = api;
