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
      currentStep: 0,
      buffers: null,
      mixer: null,
      clips: [],
      samplers: [],
    }
  },

  initMixer: function() {
    var mixer = bumpkit.createMixer();
    for (var i = 0; i < 8; i++) {
      mixer.addTrack();
    }
    return mixer;
  },

  initClips: function() {
    var clips = [];
    for (var i = 0; i < 8; i++) {
      clips[i] = bumpkit.createClip();
      clips[i].pattern = [
        1,0,0,0,
        1,0,0,0,
        1,0,0,0,
        1,0,0,0
      ];
    }
    return clips;
  },

  initSamplers: function() {
    var samplers = [];
    for (var i = 0; i < 8; i++) {
      var beep = bumpkit.createBeep({
        duration: .25,
        frequency: 256 * i,
      });
      samplers[i] = beep;
    }
    return samplers;
  },

  initConnections: function() {
    var self = this;
    for (var i = 0; i < 8; i++) {
      var clip = this.state.clips[i];
      var sampler = this.state.samplers[i];
      var track = this.state.mixer.tracks[i];
      clip.connect(sampler);
      sampler.connect(track);
    }
  },

  componentDidMount: function() {
    var self = this;
    if (window) {
      var params = qs.parse(window.location.search);
    }
    if (!bumpkit) { return false; }
    bumpkit.loopLength = this.state.loopLength;
    var mixer = this.initMixer();
    var clips = this.initClips();
    var samplers = this.initSamplers();
    this.setState({
      mixer: mixer,
      clips: clips,
      samplers: samplers,
      isPlaying: bumpkit.isPlaying,
      tempo: bumpkit.tempo,
    }, function() {
      self.initConnections();
    });
    this.state.mixer.master.volume.gain.value = .00625;
    console.log(this.state.mixer.master.volume.gain.value);
    this.addStepListener();
  },

  addStepListener: function() {
    if (!window) return false;
    var self = this;
    window.addEventListener('step', function(e) {
      var step = e.detail.step
      self.setState({ currentStep: step });
    });
  },

  playPause: function() {
    if (!bumpkit) return false;
    bumpkit.playPause();
    this.setState({
      isPlaying: bumpkit.isPlaying
    });
  },

  loadBuffer: function(url) {
    bumpkit.loadBuffer(url);
  },

  handleTempoChange: function(e) {
    var tempo = e.target.value;
    bumpkit.tempo = tempo
    this.setState({ tempo: bumpkit.tempo });
  },

  render: function() {
    return (
      <div className="px2">
        <Toolbar {...this.props} {...this.state}
          playPause={this.playPause}
          handleTempoChange={this.handleTempoChange} />
        <Sequencer {...this.props} {...this.state} />
      </div>
    )
  }

});

