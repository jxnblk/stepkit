/** @jsx React.DOM */

var React = require('react');
var qs = require('query-string');
var Q = require('q');

var bumpkit = require('../bumpkit');

var Toolbar = require('./toolbar.jsx');
var Sequencer = require('./sequencer.jsx');
var Footer = require('./footer.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      isPlaying: false,
      loopLength: 16,
      tempo: 96,
      currentStep: 0,
      volume: 1,
      buffers: [],
      mixer: null,
      clips: [],
      samplers: [],
      currentKit: 1,
      currentBank: 2,
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
    var tempo = bank.tempo || false;
    if (tempo) {
      this.setTempo(tempo);
    }
    this.setState({ currentBank: i }, function() {
      this.updateUrlParams();
    });
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

  loadBuffers: function() {
    var self = this;
    var deferred = Q.defer();
    var kit = this.props.kits[this.state.currentKit];
    var samples = kit.samples;
    var buffers = this.state.buffers;
    bumpkit.buffers = {};
    samples.forEach(function(sample, i) {
      (function(index) {
        var url = self.props.audio_path + kit.path + '/' + sample;
        bumpkit.loadBuffer(url, function(buffer) {
          buffers[index] = buffer;
          buffers[index].url = url;
          if ( samples.length <= Object.keys(bumpkit.buffers).length ) {
            self.setState({ buffers: buffers }, function() {
              deferred.resolve();
            });
          }
        });
      })(i);
    })
    return deferred.promise;
  },

  loadSamplers: function() {
    var self = this;
    var samplers = this.state.samplers;
    var bufferKeys = Object.keys(this.state.buffers);
    bufferKeys.forEach(function(key, i) {
      samplers[i].buffer(self.state.buffers[key]);
    });
    this.setState({ samplers: samplers }, function() {
      console.log('samplers loaded');
    });
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

  loadKit: function(i) {
    var self = this;
    this.setState({ currentKit: i }, function() {
      self.loadBuffers().then(function() {
        self.loadSamplers();
      });;
      self.updateUrlParams();
    });
  },

  handleTempoChange: function(e) {
    var self = this;
    var tempo = e.target.value;
    this.setTempo(tempo);
  },

  setTempo: function(n) {
    var self = this;
    bumpkit.tempo = n
    this.setState({ tempo: bumpkit.tempo }, function() {
      // Fix this in Bumpkit
      if (self.state.isPlaying) {
        self.state.mixer.master.mute.gain.value = 0;
        self.playPause();
        self.playPause();
        self.state.mixer.master.mute.gain.value = 1;
      }
      self.updateUrlParams();
    });
  },

  updateClips: function(clips) {
    this.setState({ clips: clips });
  },

  initBumpkit: function() {
    var self = this;
    if (!bumpkit) { return false; }
    this.setTempo(this.state.tempo);
    bumpkit.loopLength = this.state.loopLength;
    var mixer = this.initMixer();
    var clips = this.initClips();
    var samplers = this.initSamplers();
    this.setState({
      mixer: mixer,
      clips: clips,
      samplers: samplers,
      isPlaying: bumpkit.isPlaying,
    }, function() {
      self.initConnections();
      self.loadBank(self.state.currentBank);
      self.loadBuffers().then(function() {
        self.loadSamplers();
      });;
    });
    this.state.mixer.master.volume.gain.value = this.state.volume;
    this.addStepListener();
  },

  updateUrlParams: function() {
    if (!window) { return false }
    var params = {
      tempo: this.state.tempo,
      currentKit: this.state.currentKit,
      currentBank: this.state.currentBank,
    };
    var query = '?' + qs.stringify(params);
    window.history.pushState(params, 'Stepkit', query);
  },

  componentDidMount: function() {
    var self = this;
    if (window) {
      var params = qs.parse(window.location.search);
      this.setState(params);
    }
    this.initBumpkit();
    if (document) {
      document.onkeydown = function(e) {
        //console.log(e.which);
        switch (e.which) {
          case 32:
            e.preventDefault();
            self.playPause();
            break;
          default:
            break;
        }
      };
    }
  },


  render: function() {
    var containerStyle = {
      minHeight: '100vh'
    };
    return (
      <div className="flex flex-column"
        style={containerStyle}>
        <Toolbar {...this.props} {...this.state}
          playPause={this.playPause}
          handleTempoChange={this.handleTempoChange}
          loadBank={this.loadBank}
          loadKit={this.loadKit}
          randomize={this.randomizePatterns}
          />
        <Sequencer {...this.props} {...this.state}
          updateClips={this.updateClips}
          />
        <Footer {...this.props} />
      </div>
    )
  }

});

