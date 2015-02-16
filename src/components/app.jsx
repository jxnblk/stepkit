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
      volume: .0625,
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
      clips[i].pattern = [];
      for (var j = 0; j < 16; j++) {
        clips[i].pattern.push( Math.round(Math.random()) );
      }
      console.log(clips[i].pattern);
    }
    return clips;
  },

  initSamplers: function() {
    var samplers = [];
    for (var i = 0; i < 8; i++) {
      var beep = bumpkit.createBeep({
        duration: .25,
        frequency: 64 * i,
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
    var self = this;
    var tempo = e.target.value;
    bumpkit.tempo = tempo
    this.setState({ tempo: bumpkit.tempo }, function() {
      // Fix this in Bumpkit
      if (self.state.isPlaying) {
        self.state.mixer.master.mute.gain.value = 0;
        self.playPause();
        self.playPause();
        self.state.mixer.master.mute.gain.value = 1;
      }
    });
  },

  updateClips: function(clips) {
    this.setState({ clips: clips });
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


  render: function() {
    return (
      <div className="px2">
        <Toolbar {...this.props} {...this.state}
          playPause={this.playPause}
          handleTempoChange={this.handleTempoChange}
          updateClips={this.updateClips}
          />
        <Sequencer {...this.props} {...this.state} />
      </div>
    )
  }

});

