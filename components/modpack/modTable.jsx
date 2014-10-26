/** @jsx React.DOM */

var ModTableHeaderRow = require("./modTableHeaderRow.jsx");
var ModTableRow = require("./modTableRow.jsx");

var ModTable = {};

ModTable.handleExpand = function(row) {
  console.log("Row:", row, "wishes to expand");
};

ModTable.render = function() {
  var rows = [
    <ModTableRow id={0} name="Lorem Ipsum" author="James Black" website="http://google.com" onExpand={this.handleExpand} />, 
    <ModTableRow id={1} name="Lorem Upsum" author="Felicia Black" onExpand={this.handleExpand} />
  ];

  return (
    <table className="table table-striped">
      <ModTableHeaderRow />
      {rows}
    </table>
  );  
};

module.exports = React.createClass(ModTable);