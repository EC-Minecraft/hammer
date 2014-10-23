/** @jsx React.DOM */

var data = [
  {author: "Pete Hunt", text: " This is one comment"},
  {author: "James Black", text: "This is *another* comment"}
];

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data:data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {

    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.title}>
          {comment.body}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    var title = this.refs.title.getDOMNode().value.trim();
    var body = this.refs.text.getDOMNode().value.trim();

    if (!body || !title) {
      return;
    }

    this.props.onCommentSubmit({title: title, body: body});

    this.refs.title.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';

  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="title" />
        <input type="text" placeholder="Say Something!!!" ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var converter = new Showdown.converter();

var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="comment">
        <h2 className="commentAuthor">{this.props.author}</h2>
        <p dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

React.renderComponent(
  <CommentBox url="http://localhost:3000/api/articles" pollInterval={2000} />,
  $('#content')[0]
);