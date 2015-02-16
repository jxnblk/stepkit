/** @jsx React.DOM */

var React = require('react');

var stepFilter = require('../util/step-filter');
var TriggerRow = require('./trigger-row.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      isSelecting: false,
      isDeselecting: false,
    }
  },

  setMouseDown: function(mode) {
    if (mode == 'select') {
      this.setState({ isSelecting: true });
    } else if (mode == 'deselect') {
      this.setState({ isDeselecting: true });
    }
  },

  setMouseUp: function() {
    this.setState({
      isSelecting: false,
      isDeselecting: false
    });
  },

  renderRow: function(clip, i) {
    var self = this;
    var updateClip = function(clip) {
      var clips = self.props.clips;
      clips[i] = clip;
      self.props.updateClips(clips);
    };
    return (
      <TriggerRow
        {...this.state}
        clip={clip}
        setMouseDown={this.setMouseDown}
        setMouseUp={this.setMouseUp}
        currentStep={this.props.currentStep}
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

