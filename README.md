# React-Flowchart #

React-Flowchart is an implementation of [React-DND](https://github.com/gaearon/react-dnd) aimed at solving my somewhat specific use case: an interactive flowchart interface. You create your own components for nodes and branches, pass them into React-Flowchart, and it will do the drag & drop wrapping for you, along with drawing lines to connect the nodes (the line drawing portion of the package desperately needs work).

Parameters:
* nodes: (array of objects) See the example below to get an idea of what this looks like. At the moment, each object in the array needs a nodeId (this will change in the next version). Each object can optionally include a "branches" array, x, and y properties. You can put whatever else you want on it, and all properties of the object will be passed into the NodeContents component as props.
* NodeContents: (component) This is the component that becomes draggable and houses branches. React-Flowchart passes all of the properties of each node in your "nodes" array as props to this component, and adds two additional props: NodeTarget (where a draggable branch can be dropped) and NodeBranches (an array of BranchContents components).
* BranchContents: (component) This is the component that houses the draggable branch handle. It receives as props all of the properties of the associated "branches" object in your "nodes" array, and adds in a "BranchHandle" prop.
* dropBranch(branch, node): (function) this function is fired when you drop a branch onto a valid NodeTarget. It receives as arguments the branch object that was dropped and the node object that it was dropped on.
* dropNode(node, coords): (function) this function is fired when you drop a node into the container area. It receives as arguments the node object that was drag & dropped and the coords{x:123,y:456} where it was dropped.
* BranchHandle: (element - optional) If you want to customize what the draggable branch handle looks like, use this to pass in something that will render.
* BranchEnd: (element - optional) If you want to customize what the branch endpoint looks like, use this to pass in something that will render.

## Example ##

While this example works, it doesn't really do anything because there is no change to the data between renders. Look at example/index.jsx to see a bit more of a real world implementation.

```js
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
```

## To-Do ##

* Must remove dependence on nodeId and branchId and handle these internally.
* Must make lines suck significantly less.
* Probably other things to handle the nuances of your use case (talk to me on github).



