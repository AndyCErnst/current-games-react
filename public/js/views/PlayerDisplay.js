'use strict';
var React = require('react');

var PlayerDisplay = React.createClass({
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
  render: function() {
    return (
      <p>
        <b>Players: </b><span>{this.getPlayerDisplay(this.props.currentPlayers, this.props.maxPlayers)}</span>
      </p>
      );
  }
})
module.exports = PlayerDisplay;
