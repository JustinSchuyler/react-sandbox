import React from 'react';
import './CommentList.css';

class CommentList extends React.Component {
  render() {
    return (
      <ul className="Comments">
        {this.props.comments.map(comment => (
          <li key={comment._id}>
            <div>{(new Date(comment.addDate)).toDateString()}</div>
            <div>{comment.text}</div>
            <button onClick={() => this.props.deleteComment(comment)} className="delete">X</button>
          </li>
        ))}
        {(this.props.error) ? (
          <li key="error" className="error">{this.props.error}</li>
        ) : ''}
      </ul>
    );
  }
}

export default CommentList;
