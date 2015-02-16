/** @jsx React.DOM */

var React = require('react');

var stepFilter = require('../util/step-filter');
var Trigger = require('./trigger.jsx');

module.exports = React.createClass({

  renderTrigger: function(step, i) {
    var active = (step > 0);
    var updateClip = function(value) {
      console.log('updateClip', value, i);
    };
    var beat = stepFilter(i + 1);
    var current = (this.props.currentStep == i);
    return (
      <div className="flex-auto flex px1">
        <Trigger active={active}
          current={current}
          updateClip={updateClip} />
      </div>
    )
  },

  renderRow: function(clip, i) {
    return (
      <div className="flex flex-center mxn1 mb1">
        {clip.pattern.map(this.renderTrigger)}
      </div>
    )
  },

  renderXAxis: function() {
    var currentStep = this.props.currentStep
    var renderSteps = function() {
      var steps = [];
      for (var i = 0; i < 16; i++) {
        var current = (i == currentStep);
        var stepClass = 'h5 bold flex-auto px1 ';
        stepClass += current ? 'red' : '';
        steps.push(
          <div className={stepClass}>
            {stepFilter(i)}
          </div>
        )
      }
      return steps;
    }
    return (
      <div className="flex flex-center mxn1 mb1">
        {renderSteps()}
      </div>
    )
  },

  render: function() {
    return (
      <div className="py2">
        {this.renderXAxis()}
        {this.props.clips.map(this.renderRow)}
      </div>
    )
  }

});

