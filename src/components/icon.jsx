/** @jsx React.DOM */

var React = require('react');

var iconPaths = require('geomicons-open/src/js/paths');


module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      icon: 'warning',
      path: '',
    }
  },

  render: function() {
    var path = iconPaths[this.props.icon];
    var style = {
      fill: 'currentColor'
    };
    return (
      <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="icon"
        style={style}>
        <path d={path} />
      </svg>
    )
  }

});

