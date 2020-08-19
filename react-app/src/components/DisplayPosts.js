import React from 'react';

export default function DisplayPosts({ posts }) {
  return (
    <div>
      <h1>All the posts:</h1>
      {posts.length > 0 ?
        posts.map(({ title, description }, index) => (
          <div key={index}>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        ))
        : <h2>Loading...</h2>}
    </div>
  );
}
