/** @jsx React.DOM */

var ModTableHeaderRow = {};

ModTableHeaderRow.render = function() {
  return (
    <tr>
      <th>#</th>
      <th>Mod Name</th>
      <th>Author</th>
      <th>Website</th>
      <th>&nbsp;</th>
    </tr>
  );  
};

module.exports = React.createClass(ModTableHeaderRow);