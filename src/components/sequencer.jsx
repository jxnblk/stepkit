/** @jsx React.DOM */

var React = require('react');

var stepFilter = require('../util/step-filter');
var TriggerRow = require('./trigger-row.jsx');

module.exports = React.createClass({

  renderRow: function(clip, i) {
    var self = this;
    var updateClip = function(clip) {
      var clips = self.props.clips;
      clips[i] = clip;
      self.props.updateClips(clips);
    };
    return (
      <TriggerRow clip={clip}
        updateClip={updateClip}
        track={i} />
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

