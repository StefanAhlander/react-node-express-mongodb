import React from 'react';
const axios = require('axios');

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', description: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/posts')
      .then((response) => {
        console.log(
          'I have these posts\n\n' + JSON.stringify(response.data, null, 2)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post('http://localhost:5000/posts', {
        title: this.state.title,
        description: this.state.description,
      })
      .then(function (response) {
        console.log(
          'We added post object:\n\n' + JSON.stringify(response.data, null, 2)
        );

        axios
          .get('http://localhost:5000/posts')
          .then((response) => {
            console.log(
              'I have now these posts\n\n' +
                JSON.stringify(response.data, null, 2)
            );
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Title</h1>
        <input
          name="title"
          type="text"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <br />
        <h1>Description</h1>
        <input
          name="description"
          type="text"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default PostForm;
