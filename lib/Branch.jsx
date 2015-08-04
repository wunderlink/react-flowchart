
var uuid = require('node-uuid');
var dnd = require('react-dnd');
var React = require('react')

var ItemTypes = require('./constants.json').ItemTypes


  
var Branch = module.exports = React.createClass({

  propTypes: {},
      
  componentWillMount : function() {},
  componentWillUnmount : function() {},

  componentWillReceiveProps: function() {
    if (this.props._drawConnection) {
      this.props._drawConnection(this.props.branch.branchId)
    }
  },

  componentDidMount : function() {
    var thisNode = React.findDOMNode(this)
//    this.props._drawConnection(this.branch, thisNode)
  },
      
  _addNewBranch : function() {
    this.props._addNewBranch()
  },
      
  render : function() {
    var contents = []
    var branchId = ''
    if (this.props.addNew) {
      contents.push(<div onClick={this._addNewBranch}>+</div>)
    } else {
      if (this.props.BranchContents) {
        branchId = this.props.branch.branchId
        contents.push(
          <div>
            <this.props.BranchContents branch={this.props.branch} />
            {this.props.BranchHandle}
          </div>)
      }
    }

    var style = {
      border: '1px solid #F00'
    }
    var html =
      <div id={branchId} style={style}>
        <div>
        {contents}
        </div>
      </div>
    return html
  }

})


