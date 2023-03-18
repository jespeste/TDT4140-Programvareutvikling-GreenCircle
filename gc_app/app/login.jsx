'use client';
import pb from './lib/pocketbase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from './Loader';
import './login.css';
import { Image, Space, PasswordInput, Input, Button, Text, Group } from '@mantine/core';

export default function Login() {
	const [isLoading, setLoading] = useState();
	const { register, handleSubmit } = useForm();
	const router = useRouter();

    const images = new Map([
		[
			'GC_logo',
			'http://127.0.0.1:8090/api/files/m9mawxr7i6htgxh/9szx48762ii1crw/gc_logo3_eGxbKtAqxM.png'
		]
	]);

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
		<div className="loginroot"
        // style={{background: "#282424"}} dark-mode test
        >
			{isLoading && <Loader></Loader>}
			{!isLoading && (
				<form onSubmit={handleSubmit(login)}>
					<div className="logincontainer">
                        <Image maw={275} mx="auto" radius="md" src={images.get('GC_logo')} alt="Login_logo" />
                        <Space h={5} />
						<div className="logininnercontainer">
                            <Input.Wrapper label="E-post">
                                <Input
                                    {...register('email')}
                                    className="email"
                                    type="email"
                                    variant="filled"
                                    placeholder="E-post"

                                    style={{ width: "400px"}}
                                    styles={(theme) => ({
                                        input: {
                                        '&:focus-within': {
                                            borderColor: "teal",
                                        },
                                        },
                                    })}
                                />
                            </Input.Wrapper>

                            <PasswordInput
                                className="password"
                                style={{ width: "400px"}}
                                styles={(theme) => ({
                                    input: {
                                        '&:focus-within': {
                                        borderColor: "teal",
                                        },
                                    },
                                    })}
                                variant="filled"
                                placeholder="Passord"
                                label="Passord"
                                // error="Feil passord"
                                {...register('password')}
                            />

                            <Space h={40} />

                            <Button 
                                color="teal" 
                                size="md" 
                                type="submit" 
                                disabled={isLoading} 
                                compact
                                style={{ width: "275px"}}
                            >
                                Logg inn
                            </Button>

                            <Space h={25} />
                            
                            <Text
                                ta="center"
                                fz="md"
                                fw={475}
                            >
                                Ikke bruker? 
                                <button className="registerbutton" type="button" onClick={reggie}>
                                    {<Text
                                        ta="center"
                                        fz="md"
                                        fw={475}>
                                        Lag profil
                                    </Text>}
                                </button>
                            </Text>
                        </div>
                    </div>
				</form>
			)}
		</div>
	);
}
