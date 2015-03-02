/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  render: function() {
    return (
      <footer className="mt3 px2 border-top xborder-thick xborder-bright-blue">
        <hr className="m0 border-thick border-bright-blue muted" />
        <div className="h5 bold flex flex-baseline flex-wrap mxn2 py2">
          <div className="px2">
            Stepkit v{this.props.version}
          </div>
          <div className="flex-auto" />
          <div className="px2">
            <span>Made by </span>
            <a href="//jxnblk.com" className="button button-transparent">Jxnblk</a>
          </div>
        </div>
      </footer>
    )
  },

});

