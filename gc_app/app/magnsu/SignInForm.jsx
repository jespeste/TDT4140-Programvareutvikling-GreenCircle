import React, { useState } from 'react';

/**
 * Attempts to sign in a user based on input form data, if form data successfully matches that of an 
 * existing user, then that user is signed in and set as the currently active user.
 * @function
 * @param {props} SignInFormProps - As described below.
 * @prop {User[]} users - Array of pre-existing users. Used to search for a user with sign-in credentials matching the submitted form input.
 * @prop {onAddPostCallback} onAddUser - A callback function to handle the submission of a sign-in attempt.
 * @returns - A form with input for sign-in credentials.
 */
function SignInForm({users, onSignInUser}) {
  const [email, setEmail] = useState('nameson99@mail.com');
  const [password, setPassword] = useState('Password1234');

  const handleSubmit = (event) => {
    event.preventDefault();

    const authenticated_user = users.find(
        (user) => user.email === email && user.password === password
    );

    if (authenticated_user != null) {
        onSignInUser(authenticated_user)
    } else {
        alert("Invalid email or password");
    } 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>SignIn-form:</h3>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <br />
      <button type="submit">Sign in</button>
    </form>
  );
}

export default SignInForm;