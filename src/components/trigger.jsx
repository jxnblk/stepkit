/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      active: this.props.active,
    }
  },

  handleClick: function(e) {
    console.log('updateClip');
    var active = !this.state.active;
    this.setState({ active: active }, function() {
      this.props.updateClip(this.state.active ? 1 : 0);
    });
  },

  render: function() {
    var self = this;
    var buttonClass = 'flex-auto ';
    buttonClass += this.props.current ? 'button-red ' : 'button-blue-outline ';
    buttonClass += (!this.props.current && this.state.active) ? 'is-active ' : '';
    var label = this.state.active ? '1' : '0';
    return (
      <button className={buttonClass}
        onClick={this.handleClick}>
        {label}
      </button>
    )
  },

});

