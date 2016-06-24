'use strict';
var React = require('react'),
  ReactDOM = require('react-dom'),
  $ = require('jquery');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').Route;
var Link = require('react-router').Link;

'use strict';
var React = require('react'),
  ReactDOM = require('react-dom'),
  $ = require('jquery'),
  GameList = require('./views/GameList'),
  Game = require('./views/Game'),
  NavLinks = require('./views/NavLinks'),
  About = require('./views/About');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var Wrapper = React.createClass({
  render: function() {
    return (
        <div>
          <NavLinks />
          {this.props.children}
        </div>
      );
  }
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Wrapper}>
      <IndexRoute component={GameList}/>
      <Route path="/game/:id" component={Game}>
        <Route path="/game/:id/edit" component={Game}/>
      </Route>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
  ), document.getElementById('app-content')
);
    // <Route path="/editgame/:name" component={GameEdit}/>
