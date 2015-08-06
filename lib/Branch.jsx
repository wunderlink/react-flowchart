
var React = require('react')

var BranchHandle = require('./branch-handle.jsx')
  
var Branch = module.exports = React.createClass({

  propTypes: {},
      
  componentWillMount : function() {},
  componentWillUnmount : function() {},
  componentWillReceiveProps: function() {},
  componentDidMount : function() {},
      
  render : function() {
    html = React.createElement(this.props.BranchContents, this.props.branch)
    return html
  }

})


