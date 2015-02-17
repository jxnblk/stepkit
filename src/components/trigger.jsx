/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  handleMouseDown: function(e) {
    var mode = this.props.active ? 'deselect' : 'select';
    this.props.setMouseDown(mode);
    this.props.updateClip(!this.props.active ? 1 : 0);
  },

  handleMouseUp: function(e) {
    this.props.setMouseUp();
  },

  handleMouseEnter: function(e) {
    if (this.props.isSelecting) {
      this.props.updateClip(1);
    } else if (this.props.isDeselecting) {
      this.props.updateClip(0);
    }
  },

  render: function() {
    var self = this;
    var buttonClass = 'flex-auto button-outline ';
    buttonClass += this.props.current ? 'red bg-red ' : 'blue ';
    if (!this.props.current) {
      buttonClass += (this.props.active) ? 'bg-blue ' : '';
    }
    var buttonStyle = {
      height: '3rem'
    };
    return (
      <button className={buttonClass}
        title="Toggle step"
        style={buttonStyle}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseEnter={this.handleMouseEnter}
        />
    )
  },

});

