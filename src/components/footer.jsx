/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  render: function() {
    return (
      <footer className="mt3 px2 bg-darken-2">
        <div className="h5 bold flex flex-center flex-wrap mxn2 py2">
          <div className="px2">
            Stepkit v{this.props.version}
          </div>
          <div className="flex-auto" />
          <div className="px2">
            <span>Made by </span>
            <a href="//jxnblk.com">Jxnblk</a>
          </div>
        </div>
      </footer>
    )
  },

});

