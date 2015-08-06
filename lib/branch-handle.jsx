var dnd = require('react-dnd');
var React = require('react')

var ItemTypes = require('./constants.json').ItemTypes


var branchSource = { 
  beginDrag: function (props) {
    return {branch:props.branch, dropBranch:props.dropBranch}
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
    BranchHandleContents: React.PropTypes.node,
    isDragging: React.PropTypes.bool.isRequired
  },  

  componentDidMount: function () {
    var connectDragPreview = this.props.connectDragPreview;
    connectDragPreview(<div>▶</div>);
  },

  render: function () {
    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    var contents = '⬤'
    if (this.props.BranchEndContents) {
      contents = this.props.BranchEndContents
    }

    return connectDragSource(
      <div className='rf-branchHandle' id={'handle-'+this.props.branch.branchId} style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move'
      }}> 
        {contents}
      </div>
    );  
  }
})

var BranchHandle = module.exports = dnd.DragSource(ItemTypes.branchOut, branchSource, collect)(BranchOut);
