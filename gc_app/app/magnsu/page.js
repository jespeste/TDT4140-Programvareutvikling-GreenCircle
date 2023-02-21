"use client"
import React, { useState } from 'react';

import PostForm from './PostForm';
import PostListView from './PostListView';
import SignUpForm from './SignUpForm';
import UserListView from './UserListView';
import SignInForm from './SignInForm';
import AuthenticationView from './AuthenticationView';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [active_user, setActiveUser] = useState(null);

  const updateUsers = (updated_users) => {
    setUsers(updated_users)
  }
  const handleAddUser = (user) => {
    updateUsers([...users, user]);
  };
  const handleAddPost = (post) => {
    setPosts([...posts, post]);
  };
  const handleSignInUser = (user) => {
    setActiveUser(user);
  };
  const handleSignOutUser = () => {
    setActiveUser(null);
  };

  return (
    <>
      <div>
        <PostForm active_user={active_user} onAddPost={handleAddPost} /> 
        <br />
        <PostListView posts={posts} /> 
        <br />
      </div>
      <div>
        {active_user ? (
            <p>Active user: {active_user.email} 
            <br />
            <button onClick={handleSignOutUser}>Sign out</button> </p>
        ) : (
            <SignInForm users={users} onSignInUser={handleSignInUser}  />
        )}
      </div>
      <br />
      <div>
        <SignUpForm users={users} onAddUser={handleAddUser} /> 
        <br />
        <UserListView users={users} active_user={active_user} /> 
        <br />
      </div>
    </>
  )
}

