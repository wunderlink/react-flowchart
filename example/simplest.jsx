var React = require('react')
var ReactFlow = require('../index.js')
var EventEmitter = require('events')

require('./style.css')



var data = [
  {
    nodeId: 'node1',
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
    x: 250,
    y: 20
  },    
  {
    nodeId: 'node3',
    x: 250,
    y: 200 
  }
]

var NodeContents = React.createClass({
  render : function() {
    var html = 
      <div className="node">
        {this.props.NodeTarget}
        {this.props.NodeBranches}
      </div>
    return html
  }
})

var BranchContents = React.createClass({
  render : function() {
      var html =
      <div className='branchHandle'>
        {this.props.BranchHandle}
      </div>
    return html
  }
})

var dropNode = function (node, coords) {
        console.log('dropped at '+coords.x+','+coords.y)
}

var dropBranch = function (branch, node) {
        console.log('dropped branchId:'+branch.branchId+' on nodeId:'+node.nodeId)
}



React.render(
  (
    <div className="container">
      <ReactFlow
          NodeContents={NodeContents}
          BranchContents={BranchContents}
          dropBranch={dropBranch}
          dropNode={dropNode}
          nodes={data} />
    </div>
  ),          
  document.body
)

