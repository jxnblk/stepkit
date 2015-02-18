/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  handleChange: function(e) {
    this.props.loadKit(e.target.value);
  },

  render: function() {
    var kits = this.props.kits;
    var options = function() {
      var options = [];
      kits.forEach(function(kit, i) {
        var optionKey = 'kit-option-' + i
        options.push(
          <option key={optionKey} value={i}>{kit.name}</option>
        )
      });
      return options;
    };
    return (
      <select className="m0 field-dark"
        onChange={this.handleChange}>
        {options()}
      </select>
    )
  },

});

