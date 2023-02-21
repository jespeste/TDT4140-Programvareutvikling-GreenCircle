"use client"
import pb from "../lib/pocketbase"
import User from "./User";
import { useState } from 'react'

export default function Register() {
    const [userName, setUserName] = useState("Username");
    const [firstName, setFirstName] = useState('Name');
    const [lastName, setLastName] = useState('Last name');
    const [email, setEmail] = useState("Email");
    const [password, setPassword] = useState("Password");
    const [passwordConfirm, setPasswordConfirm] = useState("Confirm Password");
    const [telephone, setTelephone] = useState();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        var user = new User(userName,email,true,firstName,lastName,password,passwordConfirm,telephone);
        // const data = {
        //     "username": userName,
        //     "email": email,
        //     "emailVisibility": true,
        //     "password": password,
        //     "passwordConfirm": passwordConfirm,
        //     "firstName": firstName,
        //     "lastName": lastName,
        //     "telephone": telephone
        // };
        createUser(user);
    };

    async function createUser(user){
        try {
            const record = await pb.collection('users').create(user);
            alert("User Created.")
        } catch (e) {
            alert(e);
        }
    }

    return (<div>
        <form onSubmit={handleSubmit}>
        <h3>SignUp-form:</h3>
        <label>
        Username:
        <input 
            type="string" value={userName} onChange={(event) => setUserName(event.target.value)} required/>
        </label>
        <br/>
        <label>
        First name:
        <input 
            type="string" value={firstName} onChange={(event) => setFirstName(event.target.value)} required/>
      </label>
      <br />
      <label>
        First name:
        <input type="string" value={lastName} onChange={(event) => setLastName(event.target.value)} required/>
      </label>
      <br />
      <label>
        Phone number:
        <input type="tel" value={telephone} onChange={(event) => setTelephone(event.target.value)} />
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
      <label>
        Confirm password:
        <input type="password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} required/>
      </label>
      <br />
      <button type="submit">Add User</button>
        </form>
        </div>
    )
}