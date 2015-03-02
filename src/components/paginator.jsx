
var React = require('react');

var Icon = require('./icon.jsx');

module.exports = React.createClass({

  handleLoopLengthChange: function(e) {
    this.props.setLoopLength(e.target.value);
  },

  render: function() {
    var options = [
      { value: 16, title: '1 Bar' },
      { value: 32, title: '2 Bars' },
      { value: 64, title: '4 Bars' },
    ];
    var renderOption = function(option) {
      return <option key={'loop-length-' + option.value} value={option.value}>{option.title}</option>
    };
    return (
      <div className="px2 py2">
        <div className="flex flex-center mxn2">
          <div className="flex-auto" />
          <label htmlFor="bar-length" className="hide">
            Loop Length
          </label>
          <select id="bar-length"
            value={this.props.loopLength}
            className="px2 m0 field-dark"
            onChange={this.handleLoopLengthChange}>
            {options.map(renderOption)}
          </select>
          <div className="px2">
            <button onClick={this.props.previousPage}
              className="button-outline rounded-left border-thick">
              <Icon icon="chevronLeft" />
            </button>
            <button onClick={this.props.nextPage}
              className="button-outline rounded-right border-thick">
              <Icon icon="chevronRight" />
            </button>
          </div>
        </div>
      </div>
    )
  }

});

