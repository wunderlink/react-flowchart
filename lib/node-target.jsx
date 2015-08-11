
var dnd = require('react-dnd')
var React = require('react')

var ItemTypes = require('./constants.json').ItemTypes



var nodeInTarget = {
  drop: function (props, monitor) {
    var item = monitor.getItem()
    item.dropBranch(item.branch, props.node)
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
      <div style={{width:'100%',height:'100%'}}>
        {this.props.branchesIn}
        {isOver &&
          <div className="nodeDragHover" style={{
            position: 'relative',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5
          }} />
        }
      </div>
    );
  }
})

var NodeTarget = module.exports = dnd.DropTarget(ItemTypes.branchOut, nodeInTarget, collect)(NodeIn);
