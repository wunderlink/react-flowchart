
var uuid = require('node-uuid');
var dnd = require('react-dnd');
var React = require('react')

var Branch = require('./Branch.jsx')
var ItemTypes = require('./constants.json').ItemTypes


var nodeInTarget = {
  drop: function (props, monitor) {
    moveKnight(props.x, props.y);
  }
};
  


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

