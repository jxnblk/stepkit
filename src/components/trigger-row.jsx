/** @jsx React.DOM */

var React = require('react');

var stepFilter = require('../util/step-filter');
var Trigger = require('./trigger.jsx');

module.exports = React.createClass({

  renderTrigger: function(step, i) {
    var self = this;
    var active = (step > 0);
    var clip = this.props.clip;
    var updateClip = function(value) {
      clip.pattern[i] = value;
      self.props.updateClip(clip);
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

  render: function() {
    var clip = this.props.clip;
    return (
      <div className="flex flex-center mxn1 mb1">
        {clip.pattern.map(this.renderTrigger)}
      </div>
    )
  },

});

