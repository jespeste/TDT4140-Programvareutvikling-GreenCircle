import React from 'react';

/**
 * Displays information about a single user.
 * @param {User} user - The user to be displayed.
 * @returns The display.
 */
function UserView({user}) {
  return (
    <div>
        <div>Name: {user.name_first + " " + user.name_last}</div>
        <div>
            {user.birthday ? (
                <div>Birthday: {user.birthday.getFullYear() + "-" + 
                                user.birthday.getMonth() + "-" +
                                user.birthday.getDate()} 
                </div>
            ):(
                <div>Birthday: Unknown</div>
            )}
        </div>
        <div>Phone: {user.phone_number}</div>
        <div>Email: {user.email}</div>
        <div>Password: {user.password}</div>
    </div>
  );
}

export default UserView;