var dnd = require('react-dnd');
var React = require('react')

var ItemTypes = require('./constants.json').ItemTypes


var branchSource = { 
  beginDrag: function (props) {
  console.log("BPROPS", props)
    return {branch:props.branch, _updateBranch:props._updateBranch}
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}


var BranchOut = React.createClass({

  propTypes: {
    connectDragSource: React.PropTypes.func.isRequired,
    connectDragPreview: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired
  },  

  componentDidMount: function () {
    var connectDragPreview = this.props.connectDragPreview;
    connectDragPreview(<div>▶</div>);
  },

  render: function () {
    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    return connectDragSource(
      <div id={'handle-'+this.props.branch.branchId} style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25, 
        fontWeight: 'bold',
        cursor: 'move'
      }}> 
        ⬤
      </div>
    );  
  }
})

var BranchHandle = module.exports = dnd.DragSource(ItemTypes.branchOut, branchSource, collect)(BranchOut);
