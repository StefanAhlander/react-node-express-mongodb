import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DisplayPosts from './DisplayPosts';

export default function PostForm() {
  const [post, setPost] = useState({ title: '', description: '' });
  const [oldPosts, setOldPosts] = useState([]);
  const [reload, triggerReload] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios
          .get('http://localhost:5000/posts');

        setOldPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [reload]);

  const handleChange = ({ target: { name, value } }) =>
    setPost({ ...post, [name]: value });

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await axios
        .post('http://localhost:5000/posts', {
          title: post.title,
          description: post.description
        });
      triggerReload(reload + 1);
    } catch (err) {
      console.log(err);
    }
    setPost({ title: '', description: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Title</h1>
        <input
          name="title"
          type="text"
          value={post.title}
          onChange={handleChange}
        />
        <br />
        <h1>Description</h1>
        <input
          name="description"
          type="text"
          value={post.description}
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>

      <DisplayPosts posts={oldPosts} />
    </div>
  );
}
