/** @jsx React.DOM */

var React = require('react');

var stepFilter = require('../util/step-filter');
var KitSelect = require('./kit-select.jsx');
var BankSelect = require('./bank-select.jsx');
var Icon = require('./icon.jsx');

module.exports = React.createClass({

  render: function() {
    var tempo = this.props.tempo;
    var tempoInputStyle = { width: '5rem' }
    var playPauseIcon = this.props.isPlaying ? 'pause' : 'play';
    var currentStep = stepFilter(this.props.currentStep);
    var currentBank = this.props.banks[this.props.currentBank].name;
    var currentKit = this.props.kits[this.props.currentKit].name;
    return (
      <header className="xborder-bottom border-2 border-lighten bg-darken-2 px2 py1">
        <div className="flex flex-center flex-wrap mxn1">
          <div className="px1 py1">
            <button className="h3 button-outline blue"
              onClick={this.props.playPause}>
              <Icon icon={playPauseIcon} />
            </button>
          </div>
          <div className="flex flex-center p1">
            <label className="h5 bold mr1 hide">Tempo</label>
            <input type="text"
              value={tempo}
              onChange={this.props.handleTempoChange}
              style={tempoInputStyle}
              className="m0 field-dark" />
          </div>
          <div className="h5 bold p1">
            {currentStep}
          </div>

          {/* <h1 className="h3 m0 px1">Stepkit</h1> */}
          {/* <div className="h5 bold p1">
              {currentKit}
            </div> */}

          <div className="flex-auto" />
          <div className="flex flex-center p1">
            <label className="h5 bold mr1">Pattern</label>
            <BankSelect {...this.props} />
          </div>
          <div className="flex flex-center p1">
            <label className="h5 bold mr1">Kit</label>
            <KitSelect {...this.props} />
          </div>

          {/* <div className="p1">
            <button className="button-small button-outline gray"
              onClick={this.props.randomize}>
              Randomize
            </button>
          </div>
          <div className="p1">
            <button className="button-small button-outline blue">Load</button>
          </div>
          <div className="p1">
            <button className="button-small button-outline blue">Save</button>
          </div> */}

        </div>
      </header>
    )
  }

});

