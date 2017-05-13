import React from 'react';
import './Comments.css';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
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
      console.log(error);
    };
    xhr.open('DELETE', url, true);

    xhr.send();
  }

  render() {
    return (
      <ul className="Comments">
        {this.state.comments.map(comment => (
          <li key={comment._id}>
            <div>{(new Date(comment.addDate)).toDateString()}</div>
            <div>{comment.text}</div>
            <button onClick={() => this.deleteComment(comment)} className="delete">X</button>
          </li>
        ))}
        {(this.state.error) ? (
          <li key="error" className="error">{this.state.error}</li>
        ) : ''}
      </ul>
    );
  }
}

export default Comments;
