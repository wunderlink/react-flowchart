
var uuid = require('node-uuid');
var React = require('react')
var ReactFlow = require('../index.js')
var EventEmitter = require('events')

require('./style.css')


var data = [
  {
    nodeId: 'node1',
    name: 'Node 1',
    maxBranches: 10,
    x: 20,
    y: 20,
    branches: [
      {branchId:'branch1', nodeId:"node2"},
      {branchId:'branch2', nodeId:"node2"},
      {branchId:'branch3', nodeId:"node2"}
    ]
  },
  {
    nodeId: 'node2',
    name: 'Node 2',
    x: 250,
    y: 20
  },
  {
    nodeId: 'node3',
    name: 'Node 3',
    x: 250,
    y: 200
  }
]




var globalEmitter = new EventEmitter()



var MyFlowchart = React.createClass({
  propTypes: {}, 

  getInitialState : function() {
    return {nodes:data}
  }, 

  componentDidMount: function () {
      globalEmitter.addListener('updateNode', this._updateNode);
  },

  componentWillUnmount: function () {
      globalEmitter.removeListener('updateNode', this._updateNode);
  },

  _updateNode : function (values) {
    var nodeId = values.nodeId
    var nodes = this.state.nodes
    var node = this._findNode(nodeId, nodes)
    for (var key in values) {
      node[key] = values[key]
    }
    this.setState({nodes:nodes})
  },

  _findNode : function (nodeId, nodes) {
    for (var index in nodes) {
      if (nodes[index].nodeId === nodeId) {
        return nodes[index]
      }
    }
    return false
  },

  _findBranch : function (branchId, nodes) {
    for (var index in nodes) {
      if (nodes[index].branches) {
        for (var nindex in nodes[index].branches) {
          var branch = nodes[index].branches[nindex]
          if (branch.branchId === branchId) {
            return branch
          }
        }
      }
    }
    return false
  },

  _updateBranch : function (branchId, values) {
    var nodes = this.state.nodes
    var branch = this._findBranch(branchId, nodes)
    for (var key in values) {
      branch[key] = values[key]
    }
    this.setState({nodes:nodes})
  },

  _dropNode : function (node, coords) {
    var vals = {
      nodeId: node.nodeId,
      x: coords.x,
      y: coords.y
    }
    this._updateNode(vals)
  },

  _dropBranch : function (branch, node) {
    this._updateBranch(branch.branchId, {nodeId:node.nodeId})
  },

  render : function() {
    var html =
    <div className="container">
      <ReactFlow
          NodeContents={NodeContents}
          BranchContents={BranchContents}
          dropBranch={this._dropBranch}
          dropNode={this._dropNode}
          nodes={this.state.nodes} />
    </div>
    return html
  }
})

var NodeContents = React.createClass({

  propTypes: {
    NodeBranches: React.PropTypes.array,
    NodeTarget: React.PropTypes.element
  }, 

  _addNewBranch : function() {
    var branches = this.props.branches
    if (!branches) {
      branches = []
    }
    branches.push({branchId:uuid.v4()})

    var node = {
      nodeId: this.props.nodeId,
      branches: branches
    }
    globalEmitter.emit('updateNode', node)
  },

  render : function() {
    var html =
      <div className="node">
        {this.props.NodeTarget}
        <div className="branchHolder">
          {this.props.NodeBranches}
          <div onClick={this._addNewBranch}>+</div>
        </div>
      </div>
    return html
  }

})

var BranchContents = React.createClass({

  propTypes: {
    BranchHandle: React.PropTypes.element,
  },

  render : function() {
      var html =
      <div className='branchHandle'>
        {this.props.BranchHandle}
      </div>
    return html
  }

})





React.render(
	(
  <MyFlowchart />
  ),
	document.body
)
