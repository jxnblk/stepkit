/** @jsx React.DOM */

var React = require('react');
var qs = require('query-string');
var Q = require('q');

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
      volume: .75,
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
    }
    return clips;
  },

  randomizePatterns: function() {
    var clips = this.state.clips;
    for (var i = 0; i < 8; i++) {
      clips[i].pattern = [];
      for (var j = 0; j < 16; j++) {
        clips[i].pattern.push( Math.round(Math.random() * .625) );
      }
    }
    this.updateClips(clips);
  },

  loadBank: function(i) {
    var bank = this.props.banks[i];
    var clips = this.state.clips;
    bank.tracks.forEach(function(track, j) {
      clips[j].pattern = track.pattern;
    });
    this.updateClips(clips);
  },

  initBuffers: function() {
    var self = this;
    var deferred = Q.defer();
    var kit = this.props.kits[0];
    var samples = kit.samples;
    samples.forEach(function(sample, i) {
      (function(index) {
        var url = self.props.audio_path + kit.path + '/' + sample;
        bumpkit.loadBuffer(url, function(buffer) {
          bumpkit.buffers[index] = buffer;
          delete bumpkit.buffers[url];
          if ( samples.length <= Object.keys(bumpkit.buffers).length ) {
            deferred.resolve();
          }
        });
      })(i);
    })
    return deferred.promise;
  },

  initSamplers: function() {
    var samplers = [];
    for (var i = 0; i < 8; i++) {
      //var freq = Math.pow(2, i + 3) / 3;
      //var beep = bumpkit.createBeep({
      //  duration: .25,
      //  frequency: freq,
      //});
      var sampler = bumpkit.createSampler();
      samplers[i] = sampler;
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

  loadSamplers: function() {
    var samplers = this.state.samplers;
    var bufferKeys = Object.keys(bumpkit.buffers);
    bufferKeys.forEach(function(key, i) {
      samplers[i].buffer(bumpkit.buffers[key]);
    });
    this.setState({ samplers: samplers });
    //console.log('samplers loaded');
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

  loadKit: function(i) {
    console.log('load kit ' + i + ' placeholder');
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
      self.loadBank(0);
      //self.randomizePatterns();
      self.initBuffers().then(function() {
        //console.log('buffers loaded', bumpkit.buffers);
        self.loadSamplers();
      });;
    });
    this.state.mixer.master.volume.gain.value = this.state.volume;
    //console.log('test volume', this.state.mixer.master.volume.gain.value);
    this.addStepListener();
  },


  render: function() {
    return (
      <div className="px2">
        <Toolbar {...this.props} {...this.state}
          playPause={this.playPause}
          handleTempoChange={this.handleTempoChange}
          loadBank={this.loadBank}
          randomize={this.randomizePatterns}
          />
        <Sequencer {...this.props} {...this.state}
          updateClips={this.updateClips}
        />
      </div>
    )
  }

});

