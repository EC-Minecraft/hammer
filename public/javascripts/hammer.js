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

var CommentBox = {};

CommentBox.render = function() {
  return (
    React.DOM.div({className: "commentBox"}, 
      "Hello, world! I am a CommentBox."
    )
  );  
};

module.exports = React.createClass(CommentBox);
});

require.register("./components/modpack", function (exports, module) {
var modPack = function() {};

modPack.CommentBox = require("./components/modpack/commentBox.jsx");

module.exports = modPack;
});

require.register("ec-hammer", function (exports, module) {
module.exports = null;
});

require("ec-hammer")
