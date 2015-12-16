'use strict';
var React = require('react'),
  ReactDOM = require('react-dom');

// app-content
var GameList = React.createClass({
  getInitialState: function(){
      return null;
  },
  render: function(){
    var games = this.props.games.map(function(game, index){
      var mins = game.durationMins % 60;
      var timeDisplay = Math.floor((game.durationMins - mins)/60) + ' hours ';
      timeDisplay += mins ? mins + ' mins' : '';
      var playersDisplay = game.currentPlayers >= game.maxPlayers ?
        'Game Full' :
        game.currentPlayers + ' of ' + game.maxPlayers;
      return (
        <div className="game-view" key="{index}">
          <h2>{game.title}</h2>
          <p>
            <b>Duration: </b>
            <span>{timeDisplay}</span>
          </p>
          <p>
            <b>Players: </b>
            <span>{playersDisplay}</span>
          </p>
        </div>
        );
    });
    return (
      <div>
        {games}
      </div>
      );
  }
});

var ListDisplay = React.createClass({
  render: function(){
    var games=[{durationMins: 73, title: "title me", currentPlayers: 3, maxPlayers:5}];
    return (
      <div>
        <h1>What We're Playing</h1>
        <GameList games={games}/>
      </div>
      );
  }
});

ReactDOM.render(
  <ListDisplay />,
  document.getElementById('app-content')
);
