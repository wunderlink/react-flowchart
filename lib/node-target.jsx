
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
      <div className="rf-dropTarget">
        {this.props.branchesIn}
        {isOver &&
          <div className="rf-nodeDragHover" />
        }
      </div>
    );
  }
})

var NodeTarget = module.exports = dnd.DropTarget(ItemTypes.branchOut, nodeInTarget, collect)(NodeIn);
