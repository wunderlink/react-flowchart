

var uuid = require('node-uuid');
var dnd = require('react-dnd');
var HTML5Backend = require('react-dnd/modules/backends/HTML5');
var React = require('react')
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Node = require('./Node.jsx')

var ItemTypes = {
  branchOut: 'branchOut',
  nodeIn: 'nodeIn'
}


var Container = React.createClass({

  propTypes: {
    nodes: React.PropTypes.object
  },

  getInitialState: function() {
    return {nodes:this.props.nodes}
  },
  getDefaultProps: function() {},

  componentWillMount : function() {},
  componentWillReceiveProps: function(nextProps) {
    this.setState({nodes:nextProps.nodes})
  },

  componentWillUnmount : function() {},

  _updateNode : function (newNode, index) {
    var nodes = this.state.nodes
    var currentNode = nodes[index]
    currentNode = newNode
    this.setState({nodes:nodes})
  },

  render : function() {
    var nodes = []
    for (var index in this.state.nodes) {
      nodes.push(<Node 
                  node={this.state.nodes[index]} 
                  nodeIndex={index} 
                  BranchContents={this.props.BranchContents}
                  NodeContents={this.props.NodeContents}
                  _updateNode={this._updateNode}
                  key={"n"+index} />)
      console.log('n'+index)
    }
    console.log("NODES", this.state.nodes)
    var html =
      <div style={{width:this.props.width+"px", height:this.props.height+"px"}}>
      {nodes}
      </div>
    return html
  }

})


module.exports = dnd.DragDropContext(HTML5Backend)(Container);

