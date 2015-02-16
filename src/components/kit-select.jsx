/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  handleChange: function(e) {
  },

  render: function() {
    var kits = this.props.kits;
    var options = function() {
      var options = [];
      kits.forEach(function(kit, i) {
        options.push(
          <option value={i}>{kit.name}</option>
        )
      });
      return options;
    };
    return (
      <select className="m0 field-dark">
        {options()}
      </select>
    )
  },

});

