/** @jsx React.DOM */

var React = require('react');

var Icon = require('./icon.jsx');
var stepFilter = require('../util/step-filter');

module.exports = React.createClass({

  getInitialState: function() {
    return {
    }
  },

  render: function() {
    var tempo = this.props.tempo;
    var tempoInputStyle = { width: '5rem' }
    var playPauseIcon = this.props.isPlaying ? 'pause' : 'play';
    var currentStep = stepFilter(this.props.currentStep);
    return (
      <header className="border-bottom">
        <div className="flex flex-center flex-wrap mxn1">
          <h1 className="h3 m0 px1 mr2">Stepkit</h1>
          <div className="px1 py1">
            <button className="h4 button-blue"
              onClick={this.props.playPause}>
              <Icon icon={playPauseIcon} />
            </button>
          </div>
          <div className="h5 bold p1">
            {currentStep}
          </div>
          <div className="flex flex-center p1">
            <label className="h5 bold mr1">Tempo</label>
            <input type="text"
              value={tempo}
              onChange={this.props.handleTempoChange}
              style={tempoInputStyle}
              className="m0 field-dark" />
          </div>
          <div className="flex-auto" />
          <div className="p1">
            <button className="button-small button-gray">Load</button>
          </div>
          <div className="p1">
            <button className="button-small button-gray">Save</button>
          </div>
        </div>
      </header>
    )
  }

});

