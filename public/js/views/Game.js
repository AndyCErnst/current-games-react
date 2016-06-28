'use strict';
var React = require('react'),
  api = require('../api'),
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
      api.getGame(this.props.params.id)
        .done(function (data) {
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
  deleteGameClicked: function() {
    if(window.confirm('Delete this game?')) {
      this.returnHome();
      api.deleteGame(this.state.game._id)
        .done(function(){
          console.log('thing deleted');
        })
        .fail(function() {
          alert('Error: Could not delete game');
        });
    }
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
        <DurationDisplay durationMins={game.durationMins}/>
        <PlayerDisplay currentPlayers={game.currentPlayers} maxPlayers={game.maxPlayers}/>
        <button className="edit-button hidden1 btn btn-warning">Edit</button>
        <button onClick={this.deleteGameClicked} className="delete-button hidden1 btn btn-danger">Delete</button>
      </div>
      )
    //        <button className="edit-button hidden1 btn btn-success">Save</button>

  }
});
module.exports = Game;
