
var uuid = require('node-uuid');
var dnd = require('react-dnd');
var React = require('react')

var ItemTypes = require('./constants.json').ItemTypes

var BranchHandle = require('./BranchHandle.jsx')


  
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
            {this.props.BranchHandle}
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


