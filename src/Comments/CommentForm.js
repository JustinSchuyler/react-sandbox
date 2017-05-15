import React from 'react';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.postComment(this.state.value)
      .then(comment => {
        this.setState({value: ''});
        this.props.onSuccess(comment);
      })
      .catch(error => {
        console.log(error);
      });
  }

  postComment(comment) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.onload = (response) => {
        let json = JSON.parse(response.target.response);
        resolve(json);
      };

      xhr.onerror = (error) => {
        reject(error);
      };

      xhr.open('POST', 'http://localhost:8080/comments', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({text: comment}));
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Comment:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Post" />
      </form>
    );
  }
}

export default CommentForm;
