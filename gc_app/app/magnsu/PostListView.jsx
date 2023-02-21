import React from 'react';
import PostView from './PostView';

/**
 * Displays a list of posts.
 * @function
 * @prop {Post[]} users - The array of users that should be displayed.
 * @returns - The display of posts.
 */
function PostListView({posts}) {
  return (
    <ul>
      {posts.map((post, index) => (
        <li key={index}>
          <h3>Post {index}</h3>
          <PostView post={post}/>
          <br />
        </li>
      ))}
    </ul>
  );
}

export default PostListView;