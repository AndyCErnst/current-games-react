'use strict';
var React = require('react');

var FourOFour = React.createClass({
  render: function() {
    return (
      <div>
        <h1>404 page</h1>
        <p>{this.props.message}</p>
      </div>
      );
  }
})
module.exports = FourOFour;
