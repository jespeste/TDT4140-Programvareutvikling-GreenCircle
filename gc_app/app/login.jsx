'use client';
import pb from './lib/pocketbase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from './Loader';
import './login.css';
import { Image, Space, PasswordInput, Input, Button, Text } from '@mantine/core';

export default function Login() {
	const [isLoading, setLoading] = useState();
	const { register, handleSubmit } = useForm();
	const router = useRouter();

	const images = new Map([
		[
			'GC_logo',
			'http://127.0.0.1:8090/api/files/m9mawxr7i6htgxh/k9kwz27p8ekqp37/gc_logo3_275_8S63uRNkXR.png'
		]
	]);

	async function login(data) {
		pb.authStore.clear();
		setLoading(true);
		try {
			const authAdmin = await pb.admins.authWithPassword(data.email, data.password);
			const otherData = { isAdmin: true };
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
			console.log('Failed to authenticate admin');
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
						<Image maw={275} mx="auto" radius="md" src={images.get('GC_logo')} alt="Login_logo" />
						<Space h={5} />
						<div className="logininnercontainer">
							<Input.Wrapper label="E-post" required>
								<Input
									{...register('email')}
									className="email"
									type="email"
									variant="filled"
									placeholder="E-post"
									style={{ width: '400px' }}
									styles={(theme) => ({
										input: {
											'&:focus-within': {
												borderColor: 'teal'
											}
										}
									})}
									required
								/>
							</Input.Wrapper>

							<PasswordInput
								className="password"
								style={{ width: '400px' }}
								styles={(theme) => ({
									input: {
										'&:focus-within': {
											borderColor: 'teal'
										}
									}
								})}
								variant="filled"
								placeholder="Passord"
								label="Passord"
								{...register('password')}
								required
							/>
							<Space h={35} />
							<Button
								color="teal"
								size="md"
								type="submit"
								disabled={isLoading}
								compact
								style={{ width: '275px' }}
							>
								Logg inn
							</Button>
							<Space h={25} />
							<Text ta="center" fz="md" fw={475}>
								Ikke bruker?
								<Button onClick={reggie} variant="subtle" color="gray" compact>
									{
										<Text ta="center" fz="md" fw={475}>
											Lag profil
										</Text>
									}
								</Button>
							</Text>
						</div>
					</div>
				</form>
			)}
		</div>
	);
}
