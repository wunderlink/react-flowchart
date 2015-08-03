
var uuid = require('node-uuid');
var dnd = require('react-dnd');
var React = require('react')

var Branch = require('./Branch.jsx')
var ItemTypes = require('./constants.json').ItemTypes



var Node = module.exports = React.createClass({

  propTypes: {}, 

  componentWillMount : function() {}, 
  componentWillReceiveProps: function() {}, 
  componentWillUnmount : function() {}, 

  _getNodeValue : function(key) {
    var defaults = { 
      maxBranches: 2
    }   

    if (this.props.node[key]) {
      return this.props.node[key]
    } else if (defaults[key]) {
      return defaults[key]
    } else {
      return false
    }   
  },  

  _addNewBranch : function() {
    var node = this.props.node
    if (!node.branches) {
      node.branches = []
    }   
    node.branches.push({branchId:uuid.v4()})
    this.props._updateNode(node, this.props.nodeIndex)
    this.update = true
  },  

  render : function() {
    this.update = false
    var branchComps = []
    var branches = []
    if (this.props.node.branches) {
      branches = this.props.node.branches
    }   
    for (var i=0; i<branches.length; i++) {
      if (i >= this._getNodeValue('maxBranches')) {
        break
      }   
      var branch = this.props.node.branches[i]
      branchComps.push(<Branch 
                      branch={branch} 
                      index={i} 
                      BranchContents={this.props.BranchContents}
                      _addNewBranch={this._addNewBranch}
                      _updateBranch={this.props._updateBranch}
                      key={"b"+i} />) 
    }   
    var contents = []
    if (this.props.NodeContents) {
      contents.push(<this.props.NodeContents node={this.props.node} />) 
    }   

    if (branches.length < this._getNodeValue('maxBranches')) {
      branchComps.push(<Branch
                       addNew={true}
                       index={i}
                       _addNewBranch={this._addNewBranch}
                       key={"b"+i} />) 
    }   

    var containerStyle = { 
      border: '1px solid #000',
      width: '200px'
    }   
    var contentStyle = { 
      padding: '10px',
      width: '100px'
    }   
    var branchesStyle = { 
      padding: '4px',
      width: '30px'
    }   
    var html =
      <div style={containerStyle}>
        <div>
          <NodeTarget node={this.props.node} nodeIndex={this.props.nodeIndex} />
        </div>
        <div style={contentStyle}>
          <h4>{this.props.node.name}</h4>
          <div>
          {contents}
          </div>
        </div>
        <div style={branchesStyle}>
        {branchComps}
        </div>
      </div>
    return html
  }

})


var nodeInTarget = {
  drop: function (props, monitor) {
    var item = monitor.getItem()
    console.log("ITEM", item)
    console.log("props", props)
    var branch = {
      branchId:item.branch.branchId,
      nodeId:props.node.nodeId
    }
    item._updateBranch(branch)
  }
};
  
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}


var NodeIn = React.createClass({

  propTypes: {
    connectDragSource: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired
  },  

  render: function () {
    var connectDropTarget = this.props.connectDropTarget;
    var isOver = this.props.isOver;

    return connectDropTarget(
      <div style={{width:'30px',height:'30px', border:'1px solid #00FF00'}}>
        {isOver &&
          <div style={{
            position: 'relative',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow'
          }} />
        }
      </div>
    );
  }
})

var NodeTarget = dnd.DropTarget(ItemTypes.branchOut, nodeInTarget, collect)(NodeIn);
