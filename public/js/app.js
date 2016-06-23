'use strict';
var React = require('react'),
  ReactDOM = require('react-dom'),
  $ = require('jquery');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

'use strict';
var React = require('react'),
  ReactDOM = require('react-dom'),
  $ = require('jquery'),
  GameListView = require('./views/gameListView');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={GameListView}/>

  </Router>
  ), document.getElementById('app-content')
);
    // <Route path="/game/:name" component={Game}/>
    // <Route path="/editgame/:name" component={GameEdit}/>



function renderList (data) {
  // ReactDOM.render(
  //   <GameListView games={data}/>,
  //   document.getElementById('app-content')
  // );
}
// renderList();
