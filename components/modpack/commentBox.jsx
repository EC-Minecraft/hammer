/** @jsx React.DOM */

var CommentBox = {};

CommentBox.render = function() {
  return (
    <div className="commentBox">
      Hello, world! I am a CommentBox.
    </div>
  );  
};

module.exports = React.createClass(CommentBox);