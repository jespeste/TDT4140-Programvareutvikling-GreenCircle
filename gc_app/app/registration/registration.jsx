'use client';
import pb from '../lib/pocketbase';
import User from './User';
import { useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
	const [userName, setUserName] = useState('Username');
	const [firstName, setFirstName] = useState('Name');
	const [lastName, setLastName] = useState('Last name');
	const [email, setEmail] = useState('Email');
	const [password, setPassword] = useState('Password');
	const [passwordConfirm, setPasswordConfirm] = useState('Confirm Password');
	const [telephone, setTelephone] = useState();
	const router = useRouter();

	const handleSubmit = (event) => {
		event.preventDefault();
		var user = new User(
			userName,
			email,
			true,
			firstName,
			lastName,
			password,
			passwordConfirm,
			telephone
		);
		createUser(user);
	};

	async function createUser(user) {
		try {
			const record = await pb.collection('users').create(user);
			alert('User Created.');
		} catch (e) {
			alert(e);
		}
	}

	function login() {
		router.push('/login');
	}

	return (
		<div className="maincontainer">
			<h3>Lag bruker</h3>
			<div className="centered">
				<form onSubmit={handleSubmit}>
					<div className="centereditems">
						<div className="regcontainer">
							<div className="inputfield">
								Brukernavn:
								<div>
									<input
										type="string"
										value={userName}
										onChange={(event) => setUserName(event.target.value)}
										required
									/>
								</div>
							</div>
							<div className="inputfield">
								Fornavn:
								<div>
									<input
										type="string"
										value={firstName}
										onChange={(event) => setFirstName(event.target.value)}
										required
									/>
								</div>
							</div>
							<div className="inputfield">
								Etternavn
								<div>
									<input
										type="string"
										value={lastName}
										onChange={(event) => setLastName(event.target.value)}
										required
									/>
								</div>
							</div>
							<div className="inputfield">
								Telefonnummer:
								<div>
									<input
										type="tel"
										value={telephone}
										onChange={(event) => setTelephone(event.target.value)}
									/>
								</div>
							</div>
							<div className="inputfield">
								E-post:
								<div>
									<input
										type="email"
										value={email}
										onChange={(event) => setEmail(event.target.value)}
										required
									/>
								</div>
							</div>
							<div className="inputfield">
								Passord:
								<div>
									<input
										type="password"
										value={password}
										onChange={(event) => setPassword(event.target.value)}
										required
									/>
								</div>
							</div>
							<div className="inputfield">
								Gjenta passord:
								<div>
									<input
										type="password"
										value={passwordConfirm}
										onChange={(event) => setPasswordConfirm(event.target.value)}
										required
									/>
								</div>
							</div>
						</div>
						<button type="submit" className="submitbutton">
							Registrer bruker
						</button>
					</div>
				</form>
				<div className="login">
					Har du bruker?
					<button type="button" className="logginbutton" onClick={login}>
						Logg inn
					</button>
				</div>
			</div>
		</div>
	);
}
