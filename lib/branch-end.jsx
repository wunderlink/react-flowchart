
var React = require('react')

  
var BranchEnd = module.exports = React.createClass({

  propTypes: {
    BranchEndContents: React.PropTypes.node,
    branchId: React.PropTypes.string
  },
      
  render : function() {
    var contents = '▶'
    if (this.props.BranchEndContents) {
      contents = this.props.BranchEndContents
    }

    var html =
      <div className='rf-branchEnd' id={'end-'+this.props.branchId}>
      {contents}
      </div>
    return html
  }

})


