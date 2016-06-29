'use strict';
var React = require('react'),
  FourOFour = require('./404'),
  api = require('../api');

var browserHistory = require('react-router').browserHistory;

var EditGame = React.createClass({
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
  editFormChanged: function() {
    console.log('form changed');
  },
  editFormSubmitted: function() {
    debugger;
    if(false) { // data has changed
      api.saveGame(id, game)
        .done(function(){

        })
        .fail(function(){

        });
    }
  },
  inputChanged: function(name){
    var self = this;
    return function(event){
      console.log('change ' + name + ' to ' + event.target.value);
      var newState = {game:{}};
      newState.game[name] = event.target.value;
      self.setState(newState);
    };
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
      <form method="PUT" onSubmit={this.editFormSubmitted}>
        <label>
          title<br/>
          <input onChange={this.inputChanged('title')} defaultValue={game.title}/>
        </label><br/>
        <label>
          description<br/>
          <textarea onChange={this.inputChanged('description')} defaultValue={game.description}/>
        </label><br/>
        <label>
          duration<br/>
          <input onChange={this.inputChanged('durationMins')} type="range" defaultValue={game.durationMins}/>
          <span>{game.durationMins}</span>
        </label><br/>
        <label>
          max players<br/>
          <input onChange={this.inputChanged('maxPlayers')} type="number" defaultValue={game.maxPlayers}/>
        </label><br/>
        <button type="submit" className="save-changes-button btn btn-success">Save Changes</button>
        <button className="cancel-button btn btn-default">Cancel</button>
      </form>
      );
  }
});

module.exports = EditGame;
