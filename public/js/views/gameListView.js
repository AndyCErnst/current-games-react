'use strict';
var React = require('react'),
  ReactDOM = require('react-dom'),
  $ = require('jquery');

var GameListItem = React.createClass({
  getDisplayTime: function(displayMins){
    var timeDisplay = '',
        mins = displayMins % 60,
        hours = Math.floor(displayMins - mins)/60;
    if(hours) {
      timeDisplay += hours + ' hours ';
    }
    if(mins) {
      timeDisplay +=  mins + ' mins';
    }
    return timeDisplay;
  },
  getPlayerDisplay: function(currPlayers, maxPlayers) {
    var playersDisplay = '';
    if(currPlayers === undefined) {
      return 'unknown';
    }
    if(maxPlayers && currPlayers >= maxPlayers) {
      playersDisplay = 'Game Full';
    } else if (!maxPlayers) {
      playersDisplay = currPlayers;
    } else {
      playersDisplay = currPlayers + ' of ' + maxPlayers;
    }
    return playersDisplay;
  },
  handleGameClicked: function() {
    this.props.gameClicked(this.props.game);
  },
  render: function(){
    var game = this.props.game;
    return (
      <div className="game-view" onClick={this.handleGameClicked}>
        <h2>{game.title}</h2>
        <p>
          <b>Duration: </b>
          <span>{this.getDisplayTime(game.durationMins)}</span>
        </p>
        <p>
          <b>Players: </b>
          <span>{this.getPlayerDisplay(game.currentPlayers, game.maxPlayers)}</span>
        </p>
      </div>
      );
  }
});

var GameList = React.createClass({
  render: function(){
    var gameData = this.props.games;
    var games = gameData.map(function(game, index){
      return <GameListItem game={game} key={index} gameClicked={this.props.gameClicked}/>
    }, this);
    return <div>{games}</div>;
  }
});

var ListDisplay = React.createClass({
  getInitialState: function(){
      return {};
  },
  componentWillMount: function() {
    var self = this;
    $.get('/api/games', function (data) {
      console.log('data received from server');
      self.setState({games:data});
    });
  },
  gameClicked: function(game) {
    console.log(game);
  },
  render: function(){
    var gameList = this.state.games ? <GameList games={this.state.games} gameClicked={this.gameClicked}/> : null;
    return (
      <div>
        <h1>What We're Playing</h1>
        {gameList}
      </div>
      );
  }
});

module.exports = ListDisplay;
