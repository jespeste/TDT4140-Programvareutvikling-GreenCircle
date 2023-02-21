'use client';
import pb from '../lib/pocketbase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './login.css';
import Register from "./registration"

export default function Page() {
	const [isLoading, setLoading] = useState();
	const { register, handleSubmit } = useForm();
	const router = useRouter();

	async function login(data) {
		setLoading(true);
		try {
			const authData = await pb.collection('users').authWithPassword(data.email, data.password);
		} catch (e) {
			alert(e);
		}
		setLoading(false);
		if (pb.authStore.isValid) {
			router.push('/user');
		}
	}

	return (
		<div className="root">
			{isLoading && <div className="loader"></div>}
			{!isLoading && (
				<form onSubmit={handleSubmit(login)}>
					<div className="container">
						<h1 className="title">Logg inn</h1>
						<div className="innercontainer">
							<div className="username">
								E-post:
								<input type="text" placeholder="email" {...register('email')} />
							</div>
							<div className="password">
								Passord:
								<input type="password" placeholder="password" {...register('password')} />
							</div>
							<div>
								<button className="loginbutton" type="submit" disabled={isLoading}>
									Logg inn
								</button>
							</div>
						</div>
						<div className="innercontainer">
							<div className="register">
								Ikke bruker?
								<button className="registerbutton" type="submit" disabled={isLoading}>
									Lag profil
								</button>
							</div>
						</div>
					</div>
				</form>
			)}
            <Register/>
		</div>
	);
}
