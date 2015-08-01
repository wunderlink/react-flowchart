

var React = require('react')
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Container = module.exports = React.createClass({

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
    node.branches.push({name:'new branch'})
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

var Branch = React.createClass({

  propTypes: {},
  mixins: [PureRenderMixin],

  componentWillMount : function() {},
  componentWillReceiveProps: function() {},
  componentWillUnmount : function() {},

  _addNewBranch : function() {
    this.props._addNewBranch()
  },

  render : function() {
    var contents = []
    if (this.props.addNew) {
      contents.push(<div onClick={this._addNewBranch}>+</div>)
    } else {
      if (this.props.BranchContents) {
        contents.push(
          <div>
            <this.props.BranchContents branch={this.props.branch} />
            <div>o</div>
          </div>)
      }
    }

    var style = {
      border: '1px solid #F00'
    }
    var html =
      <div style={style}>
        <div>
        {contents}
        </div>
      </div>
    return html
  }

})

