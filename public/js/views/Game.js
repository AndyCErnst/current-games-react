'use strict';
var React = require('react'),
  $ = require('jquery'),
  FourOFour = require('./404'),
  DurationDisplay = require('./DurationDisplay'),
  PlayerDisplay = require('./PlayerDisplay');

var browserHistory = require('react-router').browserHistory;

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
        self.setState({error: err, errorMessage:"game not found"});
      });
    }
  },
  returnHome: function() {
    browserHistory.push('/');
  },
  render: function() {
    var game = this.state.game;
    if(this.state.error) {
      return <FourOFour message={this.state.errorMessage}/>
    }
    if(!game) {
      return null;
    }
    return (
      <div className="game-view">
        <h2>{game.title}</h2>
        <button onClick={this.returnHome} className="back-button btn btn-primary">Back</button>
        <p>
          <b>Description:</b>
          <span className="description">{game.description}</span>
        </p>
        <p>
          <b>Duration:</b>
          <DurationDisplay durationMins={game.durationMins}/>
        </p>
        <p>
          <b>Players:</b>
          <PlayerDisplay currentPlayers={game.currentPlayers} maxPlayers={game.maxPlayers}/>
        </p>
        <button className="edit-button hidden1 btn btn-danger">Edit</button>
      </div>
      )
  }
});
module.exports = Game;
