/** @jsx React.DOM */

var SearchBar = require('./searchBar.jsx');
var ModTable = require('./modTable.jsx');

var FilterableModTable = {};

FilterableModTable.render = function() {
  return (
    <div className="filterable-mod-table">
      <div className="row">
        <SearchBar />
      </div>
      <div className="row">
        <ModTable />
      </div>
    </div>
  );  
};

module.exports = React.createClass(FilterableModTable);