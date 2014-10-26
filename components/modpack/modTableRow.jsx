/** @jsx React.DOM */

var ModTableRow = {};

ModTableRow.expand = function() {
  if (this.props.onExpand) {
    this.props.onExpand(this.getDOMNode());
  }
};

ModTableRow.render = function() {
  return (
    <tr onClick={this.expand}>
      <td>{this.props.id}</td>
      <td>{this.props.name}</td>
      <td>{this.props.author}</td>
      <td>{this.props.website}</td>
      <td>&nbsp;</td>
    </tr>
  );  
};

module.exports = React.createClass(ModTableRow);