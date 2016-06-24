'use strict';
var React = require('react'),
  $ = require('jquery');

var Game = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
    var self = this;
    if(!this.state.game) {
      $.get('/api/games/' + this.props.params.id, function (data) {
        console.log('data received from server');
        self.setState({game:data});
      })
      .fail(function(err){
        console.error(err);
      });
    }
  },
  render: function() {
    var game = this.state.game;
    if(!game) {
      return null;
    }
    return (
      <div className="game-view">
        <h2>{game.title}</h2><button class="back-button btn btn-primary">Back</button>
        <p>
          <b>Description:</b>
          <span className="description">{game.description}</span>
        </p>
        <p>
          <b>Duration:</b>
          <span>{game.duration}
          </span>
        </p>
        <p>
          <b>Players:</b>
          <span>{game.currentPlayers}</span>
        </p>
        <button className="edit-button hidden1 btn btn-danger">Edit</button>
      </div>
      )
  }
});
module.exports = Game;
