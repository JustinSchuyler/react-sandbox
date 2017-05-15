import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

class Comments extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      error: ''
    };
  }

  fetchComments() {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.onload = (response) => {
        let json = JSON.parse(response.target.response);
        resolve(json);
      };
      xhr.onerror = (error) => {
        reject(error);
      };
      xhr.open('GET', 'http://localhost:8080/comments', true);

      xhr.send();
    });
  }

  componentDidMount() {
    this.fetchComments().then(comments => {
      this.setState({comments});
    })
    .catch(error => {
      this.setState({
        error: 'Could not retrieve comments'
      });
    });
  }

  deleteComment(comment) {
    const url = `http://localhost:8080/comments/${comment._id}`;
    let comments = this.state.comments.slice();
    let index = comments.indexOf(comment);
    let xhr = new XMLHttpRequest();

    xhr.onload = () => {
      comments.splice(index, 1);
      this.setState({comments});
    };
    xhr.onerror = (error) => {
      this.setState({
        error: 'Could not delete comment'
      });
    };
    xhr.open('DELETE', url, true);

    xhr.send();
  }

  handleOnSuccess(comment) {
    let comments = this.state.comments.slice();
    comments.push(comment);

    this.setState({comments});
  }

  render() {
    return (
      <div>
        <CommentList
          comments={this.state.comments}
          deleteComment={(comment) => this.deleteComment(comment)}
          error={this.state.error} />
        <CommentForm onSuccess={(comment) => this.handleOnSuccess(comment)} />
      </div>
    );
  }
}

export default Comments;
