/** @jsx React.DOM */

var React = require('react');
var qs = require('query-string');

var bumpkit = require('../bumpkit');

var Toolbar = require('./toolbar.jsx');
var Sequencer = require('./sequencer.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      isPlaying: false,
      loopLength: 16,
      tempo: 120,
      currentStep: 1
      //buffers: null
    }
  },

  componentDidMount: function() {
    if (window) {
      var params = qs.parse(window.location.search);
    }
  },

  playPause: function() {
    if (!bumpkit) return false;
    bumpkit.playPause();
  },

  loadBuffer: function(url) {
    bumpkit.loadBuffer(url);
  },

  handleTempoChange: function(e) {
    this.setState({ tempo: e.target.value });
  },

  render: function() {
    return (
      <div className="px2">
        <Toolbar {...this.props} {...this.state} handleTempoChange={this.handleTempoChange} />
        <Sequencer {...this.props} {...this.state} />
      </div>
    )
  }

});

