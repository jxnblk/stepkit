/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  handleClick: function(e) {
    console.log('updateClip');
    var active = !this.props.active;
    this.props.updateClip(active ? 1 : 0);
  },

  render: function() {
    var self = this;
    var buttonClass = 'flex-auto ';
    buttonClass += this.props.current ? 'button-red ' : 'button-blue-outline ';
    buttonClass += (!this.props.current && this.props.active) ? 'is-active ' : '';
    var buttonStyle = {
      height: '3rem'
    };
    return (
      <button className={buttonClass}
        style={buttonStyle}
        onClick={this.handleClick}>
      </button>
    )
  },

});

