import React, { useState } from 'react';
import User from './User';

/**
 * Creates a new User object from the input form data. Used for signing up new users.
 * @function
 * @param {props} SignUpFormProps - As described below.
 * @prop {User[]} users - Array of pre-existing users. Used to ensure each user's email is unique.
 * @prop {onAddPostCallback} onAddUser - A callback function to handle the submission of a new user.
 * @returns - A form with input for creating/signing up a new user.
 */
function SignUpForm({users, onAddUser}) {
  const [name_first, setNameFirst] = useState('Name');
  const [name_last, setNameLast] = useState('Nameson');
  const [phone_number, setPhoneNumber] = useState('(+12)3456789');
  const [birthday, setBirthday] = useState(null);
  const [email, setEmail] = useState('nameson99@mail.com');
  const [password, setPassword] = useState('Password1234');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (users.some(user => user.email === email)) {
        alert("Email already in use.")
    } else {
        var user = new User(name_first, name_last, email, phone_number, birthday, password);
        onAddUser(user);
    }
  };

  const handleBirthdayChange = (event) => {
    event.preventDefault();
    setBirthday(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>SignUp-form:</h3>
      <label>
        First name:
        <input 
            type="string" value={name_first} onChange={(event) => setNameFirst(event.target.value)} required/>
      </label>
      <br />
      <label>
        First name:
        <input type="string" value={name_last} onChange={(event) => setNameLast(event.target.value)} required/>
      </label>
      <br />
      <label>
        Phone number:
        <input type="tel" value={phone_number} onChange={(event) => setPhoneNumber(event.target.value)} />
      </label>
      <br />
      <label>
        Birthday:
        <input type="date" value={birthday} onChange={handleBirthdayChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
      </label>
      <br />
      <button type="submit">Add User</button>
    </form>
  );
}

export default SignUpForm;