
var dnd = require('react-dnd');
var React = require('react')

var ItemTypes = require('./constants.json').ItemTypes



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
    connectDropTarget: React.PropTypes.func.isRequired,
    isOver: React.PropTypes.bool.isRequired
  },

  render: function () {
    var connectDropTarget = this.props.connectDropTarget;
    var isOver = this.props.isOver;

    return connectDropTarget(
      <div style={{width:'30px',height:'30px', border:'1px solid #00FF00'}}>
        {this.props.branchesIn}
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

var NodeTarget = module.exports = dnd.DropTarget(ItemTypes.branchOut, nodeInTarget, collect)(NodeIn);
