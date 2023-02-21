import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import UserListView from './UserListView';

export function AuthenticationView({active_user, users}) {
//   const [active_user, setActiveUser] = useState(active_user);
//   const [users, setUsers] = useState(users);

  const setActiveUser = (user) => {
    active_user = user;
  };
  const setUsers = (users) => {
    active_user = users;
  };

  const handleSignInUser = (user) => {
    setActiveUser(user);
  };
  const handleSignOutUser = () => {
    setActiveUser(null);
  };
  const updateUsers = (updated_users) => {
    setUsers(updated_users)
  }
  const handleAddUser = (user) => {
    updateUsers([...users, user]);
  };

  return (
    <>
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

export default AuthenticationView;