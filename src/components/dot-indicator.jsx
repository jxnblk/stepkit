
var React = require('react');
var classnames = require('classnames');

module.exports = React.createClass({

  renderDot: function(dot, i) {
    var dotClass = classnames('h1',
      { 'gray muted': !dot.isVisible },
      { 'navy': dot.isDisabled },
      { 'blue': (dot.isVisible && !dot.isActive) },
      { 'red': dot.isCurrent },
      { 'mr1': ((i+1)%4 == 0) });
    return (
      <span key={'dot-'+i} className={dotClass}>&bull;</span>
    )
  },

  render: function() {
    var dots = [];
    for (var i = 0; i < 16; i++) {
      dots.push({
        isCurrent: (i == Math.floor((this.props.currentStep)/4)),
        isVisible: (Math.floor(i/4) == this.props.currentPage),
        isDisabled: (i >= Math.floor(this.props.loopLength/4))
      });
    }
    var currentStep = this.props.currentStep;
    var currentBar = this.props.currentPage;
    var loopLength = this.props.loopLength;
    return (
      <div>
        {dots.map(this.renderDot)}
      </div>
    )
  }

});

