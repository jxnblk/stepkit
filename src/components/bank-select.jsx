/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  handleChange: function(e) {
    this.props.loadBank(e.target.value);
  },

  render: function() {
    var banks = this.props.banks;
    var options = function() {
      var options = [];
      banks.forEach(function(bank, i) {
        options.push(
          <option value={i}>{bank.name}</option>
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

