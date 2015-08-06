
var React = require('react')

  
var BranchEnd = module.exports = React.createClass({

  propTypes: {
    BranchEndContents: React.PropTypes.node,
    branchId: React.PropTypes.string
  },
      
  render : function() {
    var style = { 
      position: 'absolute',
      left: 0,
      right: 0
    }   

    var contents = '▶'
    if (this.props.BranchEndContents) {
      contents = this.props.BranchEndContents
    }

    var html =
      <div className='rf-branchEnd' id={'end-'+this.props.branchId} style={style}>
      {contents}
      </div>
    return html
  }

})


