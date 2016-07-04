'use strict';
var React = require('react'),
  api = require('../api'),
  NavLinks = require('./NavLinks'),
  DurationDisplay = require('./DurationDisplay'),
  PlayerDisplay = require('./PlayerDisplay');

var browserHistory = require('react-router').browserHistory;

var GameListItem = React.createClass({
  handleGameClicked: function() {
    this.props.gameClicked(this.props.game);
    browserHistory.push('/game/' + this.props.game._id);
  },
  render: function(){
    var game = this.props.game;
    return (
      <div className="game-view" onClick={this.handleGameClicked}>
        <h2>{game.title}</h2>
        <DurationDisplay durationMins={game.durationMins}/>
        <PlayerDisplay currentPlayers={game.currentPlayers} maxPlayers={game.maxPlayers}/>
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
    if(!this.state.games) {
      api.getGames()
      .done(function (data) {
        self.setState({games:data});
      });
    }
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
