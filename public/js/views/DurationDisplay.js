'use strict';
var React = require('react');

var DurationDisplay = React.createClass({
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
  render: function() {
    return (
      <p>
        <b>Duration: </b><span>{this.getDisplayTime(this.props.durationMins)}</span>
      </p>
     );
  }
})
module.exports = DurationDisplay;
