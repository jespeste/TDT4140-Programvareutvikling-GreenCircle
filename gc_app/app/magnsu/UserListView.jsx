import React from 'react';
import UserView from './UserView'

/**
 * Displays a list of users. Can be used to get an overview of currently signed up users.
 * @prop {User[]} users - List of users. 
 * @prop {User} active_user - The currently signed in user. Used to determine if the user is an admin (requires mail=="admin@mail.com").
 * @returns - Display of users. Administrators also have 'remove user' buttons revealed to them.
 */
function UserListView({users, active_user}) {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>
          <h3> User {index} </h3>
          <UserView user={user}></UserView>
          {active_user != null && active_user.email == "admin@mail.com" ? (
            <div><button>Remove user</button></div>
            
          ):(
            <div></div>
          )}
          <br />
        </li>
      ))}
    </ul>
  );
}

export default UserListView;