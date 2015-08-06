
var React = require('react')

  
var BranchEnd = module.exports = React.createClass({

  propTypes: {
    branchId: React.PropTypes.string
  },
      
  render : function() {
    var style = { 
      position: 'absolute',
      left: 0,
      right: 0
    }   

    var html =
      <div id={'end-'+this.props.branchId} style={style}>
      ▶
      </div>
    return html
  }

})


