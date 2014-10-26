/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Meta info, accessible in the global scope unless you use AMD option.
 */

require.loader = 'component';

/**
 * Find and require a module which name starts with the provided name.
 * If multiple modules exists, the highest semver is used. 
 * This function should be used for remote dependencies.
 */

require.latest = function (name) {
  var available = Object.keys(require.modules).filter(function(moduleName) {
    return moduleName.indexOf(name) !== -1
  });
  if (available.length === 0) {
    throw new Error('failed to find latest module of "' + name + '"');
  }
  return require(available.sort().pop());
}
/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("./components/comment-box", function (exports, module) {
module.exports = function(string) {
  return console.log(string.split(" ").join("-"));
}
});

require.register("./components/modpack/commentBox.jsx", function (exports, module) {
/** @jsx React.DOM */

var SearchBar = require('./components/modpack/searchBar.jsx');
var ModTable = require('./components/modpack/modTable.jsx');

var FilterableModTable = {};

FilterableModTable.render = function() {
  return (
    React.DOM.div({className: "filterable-mod-table"}, 
      React.DOM.div({className: "row"}, 
        SearchBar(null)
      ), 
      React.DOM.div({className: "row"}, 
        ModTable(null)
      )
    )
  );  
};

module.exports = React.createClass(FilterableModTable);
});

require.register("./components/modpack/searchBar.jsx", function (exports, module) {
/** @jsx React.DOM */

var SearchBar = {};

SearchBar.render = function() {
  return (
    React.DOM.div({className: "search-bar"}, 
      "Search Bar"
    )
  );  
};

module.exports = React.createClass(SearchBar);
});

require.register("./components/modpack/modTable.jsx", function (exports, module) {
/** @jsx React.DOM */

var ModTableHeaderRow = require("./components/modpack/modTableHeaderRow.jsx");
var ModTableRow = require("./components/modpack/modTableRow.jsx");

var ModTable = {};

ModTable.handleExpand = function(row) {
  console.log("Row:", row, "wishes to expand");
};

ModTable.render = function() {
  var rows = [
    ModTableRow({id: 0, name: "Lorem Ipsum", author: "James Black", website: "http://google.com", onExpand: this.handleExpand}), 
    ModTableRow({id: 1, name: "Lorem Upsum", author: "Felicia Black", onExpand: this.handleExpand})
  ];

  return (
    React.DOM.table({className: "table table-striped"}, 
      ModTableHeaderRow(null), 
      rows
    )
  );  
};

module.exports = React.createClass(ModTable);
});

require.register("./components/modpack/modTableHeaderRow.jsx", function (exports, module) {
/** @jsx React.DOM */

var ModTableHeaderRow = {};

ModTableHeaderRow.render = function() {
  return (
    React.DOM.tr(null, 
      React.DOM.th(null, "#"), 
      React.DOM.th(null, "Mod Name"), 
      React.DOM.th(null, "Author"), 
      React.DOM.th(null, "Website"), 
      React.DOM.th(null, " ")
    )
  );  
};

module.exports = React.createClass(ModTableHeaderRow);
});

require.register("./components/modpack/modTableRow.jsx", function (exports, module) {
/** @jsx React.DOM */

var ModTableRow = {};

ModTableRow.expand = function() {
  if (this.props.onExpand) {
    this.props.onExpand(this.getDOMNode());
  }
};

ModTableRow.render = function() {
  return (
    React.DOM.tr({onClick: this.expand}, 
      React.DOM.td(null, this.props.id), 
      React.DOM.td(null, this.props.name), 
      React.DOM.td(null, this.props.author), 
      React.DOM.td(null, this.props.website), 
      React.DOM.td(null, " ")
    )
  );  
};

module.exports = React.createClass(ModTableRow);
});

require.register("./components/modpack", function (exports, module) {
var modPack = function() {};

modPack.FilterableModTable = require("./components/modpack/commentBox.jsx");

module.exports = modPack;
});

require.register("ec-hammer", function (exports, module) {
module.exports = null;
});

require("ec-hammer")
