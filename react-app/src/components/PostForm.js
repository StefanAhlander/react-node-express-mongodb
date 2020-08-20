import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DisplayPosts from './DisplayPosts';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [oldPosts, setOldPosts] = useState([]);
  const [reload, triggerReload] = useState(0);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios
          .get('http://localhost:5000/posts');

        setOldPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [reload]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await axios
        .post('http://localhost:5000/posts', {
          title,
          description
        });
      triggerReload(reload + 1);
    } catch (err) {
      console.log(err);
    }
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Title</h1>
        <input
          name="title"
          type="text"
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <br />
        <h1>Description</h1>
        <input
          name="description"
          type="text"
          value={description}
          onChange={({ target: { value } }) => setDescription(value)}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>

      <DisplayPosts posts={oldPosts} />
    </div>
  );
}
