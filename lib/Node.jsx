
var uuid = require('node-uuid');
var dnd = require('react-dnd');
var React = require('react')

var Branch = require('./Branch.jsx')
var BranchHandle = require('./BranchHandle.jsx')
var NodeTarget = require('./NodeTarget.jsx')
var ItemTypes = require('./constants.json').ItemTypes



var Node = React.createClass({

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
      var Handle = []
      for (var index in this.props.branchHandles) {
        if (this.props.branchHandles[index].branchId === branches[i].branchId) {
          Handle.push(<BranchHandle 
                          branch={branches[i]} 
                          _updateBranch={this.props._updateBranch} 
                          key={'handle_'+branches[i].branchId} />)
        }
      }
      var branch = this.props.node.branches[i]
      branchComps.push(<Branch 
                      branch={branch} 
                      index={i} 
                      BranchContents={this.props.BranchContents}
                      BranchHandle={Handle}
                      _addNewBranch={this._addNewBranch}
                      _updateBranch={this.props._updateBranch}
                      key={branch.branchId} />) 
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

    var branchesIn = []
    if (this.props.branchesIn) {
      for (var index in this.props.branchesIn) {
        branchesIn.push(<BranchHandle 
                            branch={this.props.branchesIn[index]} 
                            _updateBranch={this.props._updateBranch} 
                            key={'handle_'+this.props.branchesIn[index].branchId} />)
      }
    }

    var containerStyle = {
      border: '1px solid #000',
      width: '200px',
      position: 'absolute',
      top: this.props.y,
      left: this.props.x
    }
    var contentStyle = {
      padding: '10px',
      width: '100px'
    }
    var branchesStyle = {
      padding: '4px',
      width: '30px'
    }
    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    var html =
    connectDragSource(
      <div style={containerStyle}>
        <div>
          <NodeTarget node={this.props.node} nodeIndex={this.props.nodeIndex} branchesIn={branchesIn} />
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
    )
    return html
  }

})

var nodeSource = { 
  beginDrag: function (props) {
    return {node:props.node, _updateNode:props._updateNode}
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


var NodeContainer = module.exports = dnd.DragSource(ItemTypes.nodeContainer, nodeSource, collect)(Node);


