
var React = require('react')
var ReactFlow = require('../index.js')

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


var NodeContents = React.createClass({

  propTypes: {}, 

  componentWillMount : function() {}, 
  componentWillReceiveProps: function() {}, 
  componentWillUnmount : function() {}, 

  _parseData : function() {}, 
  _onSelect : function() {}, 

  render : function() {
    var html =
      <div>
      Hi Node
      </div>
    return html
  }

})

var BranchContents = React.createClass({

  propTypes: {}, 

  componentWillMount : function() {}, 
  componentWillReceiveProps: function() {}, 
  componentWillUnmount : function() {}, 

  _parseData : function() {}, 
  _onSelect : function() {}, 

  render : function() {
    var html =
      <div>
      <input type="text" value="" />
      </div>
    return html
  }

})



React.render(
	(
    <div>
      <ReactFlow
          width="500"
          height="500"
          NodeContents={NodeContents}
          BranchContents={BranchContents}
          nodes={data} />
    </div>
  ),
	document.body
)
