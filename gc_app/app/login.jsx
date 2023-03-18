'use client';
import pb from './lib/pocketbase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from './Loader';
import './login.css';

export default function Login() {
	const [isLoading, setLoading] = useState();
	const { register, handleSubmit } = useForm();
	const router = useRouter();

	async function login(data) {
		pb.authStore.clear();
		setLoading(true);
		try {
			const authAdmin = await pb.admins.authWithPassword(data.email, data.password);
			const otherData = {"isAdmin": true};
			try {
				const authData = await pb.collection('users').authWithPassword(data.email, data.password);
				let activeUser = pb.authStore.model;
				const authAdmin = await pb.admins.authWithPassword(data.email, data.password);
				const record = await pb.collection('users').update(activeUser.id, otherData);
				const authData2 = await pb.collection('users').authWithPassword(data.email, data.password);
			} catch (e) {
				alert(e);
			}
		} catch (error) {
			console.log("Failed to authenticate admin");
			console.log(error);
			try {
				const authData = await pb.collection('users').authWithPassword(data.email, data.password);
				const activeUser = pb.authStore.model;
			} catch (e) {
				alert(e);
			}
		}
		setLoading(false);
		if (pb.authStore.isValid) {
			router.push('/homepage');
		}
		console.log(pb.authStore.model);
	}
	function reggie() {
		router.push('/registration');
	}
	return (
		<div className="loginroot">
			{isLoading && <Loader></Loader>}
			{!isLoading && (
				<form onSubmit={handleSubmit(login)}>
					<div className="logincontainer">
						<h1 className="logintitle">Greencircle</h1>
						<div className="logininnercontainer">
							<input className="email" type="text" placeholder="Epost" {...register('email')} />
							<input
								className="password"
								type="password"
								placeholder="Passord"
								{...register('password')}
							/>
							<div>
								<button className="loginbutton" type="submit" disabled={isLoading}>
									Logg inn
								</button>
							</div>
						</div>
						<div className="logininnercontainer">
							<div className="loginregister">
								Ikke bruker?
								<button className="registerbutton" type="button" onClick={reggie}>
									Lag profil
								</button>
							</div>
						</div>
					</div>
				</form>
			)}
		</div>
	);
}
