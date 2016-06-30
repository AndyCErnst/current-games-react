'use strict';
var React = require('react'),
  FourOFour = require('./404'),
  api = require('../api');

var browserHistory = require('react-router').browserHistory;

var EditGame = React.createClass({
  getInitialState: function() {
    window.edit = this;
    return {hasChanged: false};
  },
  componentWillMount: function() {
    var self = this;
    if(!this.state.game) {
      api.getGame(this.props.params.id)
        .done(function (data) {
          self.setState({game:data});
        })
        .fail(function(err){
          console.error(err);
          self.setState({error: err, errorMessage:"game not found"});
        });
    }
  },
  editFormChanged: function(e) {
    var input = e.target;
    var fieldName = input.attributes.name.value;
    if (e.isDefaultPrevented()) {
      return;
    }
    e.preventDefault();
    // var type = input.attributes.type;
    //value = type === 'number' || type === 'range' ? parseInt(input.value) : input.value;
    this.updateStateFromForm(fieldName, input.value);
  },
  updateStateFromForm: function(fieldName, value) {
    var newState = this.state;
    newState.hasChanged = true;
    newState.game[fieldName] = value;
    this.setState(newState);
  },
  incrementer: function(e) {
    e.preventDefault();
    var input = e.target;
    var fieldName = input.attributes.name.value;
    var value = this.state.game[fieldName] + 1;
    this.updateStateFromForm(fieldName, parseInt(value, 10));
  },
  decrementer: function(e){
    e.preventDefault();
    var input = e.target;
    var fieldName = input.attributes.name.value;
    var value = this.state.game[fieldName] - 1;
    this.updateStateFromForm(fieldName, parseInt(value, 10));
  },
  editFormSubmitted: function(e) {
    e.preventDefault();
    var self = this;
    if(this.state.hasChanged) { // data has changed
      var game = this.state.game;
      api.saveGame(game._id, game)
        .done(function(){
          self.returnToGameView();
        })
        .fail(function(){
          // display error
        });
    } else {
      this.returnToGameView();
    }
  },
  returnToGameView: function(e) {
    if(e && e.preventDefault) {e.preventDefault();}
    browserHistory.push('/game/' + this.state.game._id);
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
      <form method="PUT" onSubmit={this.editFormSubmitted} onChange={this.editFormChanged}>
        <label>
          title<br/>
          <input name="title" defaultValue={game.title}/>
        </label><br/>
        <label>
          description<br/>
          <textarea name="description" defaultValue={game.description} cols="50" rows="5"/>
        </label><br/>
        <label>
          duration <span>{game.durationMins} minutes</span><br/>
          <input name="durationMins" type="range" max="360" defaultValue={game.durationMins}/>
        </label><br/>
         <label>
          current players<br/>
          <input name="currentPlayers" type="number" defaultValue={game.currentPlayers}/>
          <button className="circle-button btn btn-success" onClick={this.incrementer}>+</button>
          <button className="circle-button btn btn-success" onClick={this.decrementer}>-</button>
        </label><br/>
        <label>
          max players<br/>
          <input name="maxPlayers" type="number" defaultValue={game.maxPlayers}/>
          <button name="maxPlayers" className="circle-button btn btn-success" onClick={this.incrementer}>+</button>
          <button name="maxPlayers" className="circle-button btn btn-success" onClick={this.decrementer}>-</button>
        </label><br/>
        <button type="submit" className="save-changes-button btn btn-success">Save Changes</button>
        <button onClick={this.returnToGameView} className="cancel-button btn btn-default">Cancel</button>
      </form>
      );
  }
});

module.exports = EditGame;
