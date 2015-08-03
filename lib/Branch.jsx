
var uuid = require('node-uuid');
var dnd = require('react-dnd');
var React = require('react')

var ItemTypes = require('./constants.json').ItemTypes


  
var Branch = module.exports = React.createClass({

  propTypes: {},
      
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
            <BranchHandle branch={this.props.branch} _updateBranch={this.props._updateBranch} />
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


var branchSource = {
  beginDrag: function (props) {
	console.log("BPROPS", props)
    return {branch:props.branch, _updateBranch:props._updateBranch}
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


var BranchOut = React.createClass({

  propTypes: {
    connectDragSource: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired
  },

  render: function () {
    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
        ♘
      </div>
    );
  }
})

var BranchHandle = dnd.DragSource(ItemTypes.branchOut, branchSource, collect)(BranchOut);
