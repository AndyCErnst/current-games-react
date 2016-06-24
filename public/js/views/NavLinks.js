'use strict';
var React = require('react');
var Link = require('react-router').Link;

var NavLinks = React.createClass({
  render: function() {
    return (
      <ul role="nav">
        <li><Link to="/" activeStyle={{ color: 'red' }} activeClassName="active" onlyActiveOnIndex={true}>Home</Link></li>
        <li><Link to="/about" activeStyle={{ color: 'red' }} activeClassName="active">About</Link></li>
      </ul>
      );
  }
});

module.exports = NavLinks;
