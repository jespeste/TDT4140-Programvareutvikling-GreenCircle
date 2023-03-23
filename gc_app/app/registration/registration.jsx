'use client';
import pb from '../lib/pocketbase';
import User from './User';
import { useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import './registration.css';
import { Image, Space, PasswordInput, Input, Button, Text, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


export default function Registration() {
	const [userName, setUserName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [telephone, setTelephone] = useState();
	const [isLoading, setLoading] = useState();
	const router = useRouter();

    const [visible, { toggle }] = useDisclosure(false);

    const images = new Map([
		[
			'GC_logo',
			'http://127.0.0.1:8090/api/files/m9mawxr7i6htgxh/k9kwz27p8ekqp37/gc_logo3_275_8S63uRNkXR.png'
		]
	]);

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
			alert('Bruker opprettet.');
            const auth = await pb.collection('users').authWithPassword(user.email, user.password);
			router.push('/homepage');
		} catch (e) {
			alert(e);
		}
	}

	function login() {
		router.push('/');
	}

	return (
		<div class="root">
			{isLoading && <div className="loader"></div>}
			{!isLoading && (
				<div>
                
                    <Image maw={275} mx="auto" radius="md" src={images.get('GC_logo')} alt="Login_logo" />
					<div className="registrationinnercontainer">
						<form onSubmit={handleSubmit}>
                            <div className="centereditems">

                                <Input.Wrapper label="Brukernavn"
                                    withAsterisk>
                                    <Input
                                        value={userName}
									    onChange={(event) => setUserName(event.target.value)}
                                        placeholder="Eksempel123"
                                        type="string"
                                        required
                                        
                                        className="forminput"
                                        variant="filled"
                                        />
                                </Input.Wrapper>

                                <Input.Wrapper label="Fornavn"
                                    withAsterisk>
                                    <Input
                                        type="string"
                                        value={firstName}
                                        placeholder="Navn"
                                        onChange={(event) => setFirstName(event.target.value)}
                                        required

                                        className="forminput"
                                        variant="filled"
                                        />
                                </Input.Wrapper>

                                <Input.Wrapper label="Etternavn"
                                    withAsterisk>
                                    <Input
                                        type="string"
                                        value={lastName}
                                        placeholder="Navnson"
                                        onChange={(event) => setLastName(event.target.value)}
                                        required

                                        className="forminput"
                                        variant="filled"
                                        />
                                </Input.Wrapper>

                                <Input.Wrapper label="Telefonnummer"
                                    >
                                    <Input
                                        type="tel"
                                        value={telephone}
                                        placeholder="123456789"
                                        onChange={(event) => setTelephone(event.target.value)}

                                        className="forminput"
                                        variant="filled"
                                        />
                                </Input.Wrapper>

                                <Input.Wrapper label="E-post"
                                    withAsterisk>
                                    <Input
                                        type="email"
                                        value={email}
                                        placeholder="eksempel@mail.com"
                                        onChange={(event) => setEmail(event.target.value)}
                                        required

                                        className="forminput"
                                        variant="filled"
                                        />
                                </Input.Wrapper>

                                <PasswordInput
                                    label="Passord"
                                    description="Passordet må ha minst 8 tegn"
                                    value={password}
                                    placeholder="Passord"
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    
                                    defaultValue="secret"
                                    visible={visible}
                                    onVisibilityChange={toggle}

                                    className="forminput"
                                    variant="filled"
                                />
                                <PasswordInput
                                    label="Bekreft passord"
                                    
                                    value={passwordConfirm}
                                    placeholder="Gjenta passord"
                                    onChange={(event) => setPasswordConfirm(event.target.value)}
                                    required
                                    
                                    defaultValue="secret"
                                    visible={visible}
                                    onVisibilityChange={toggle}

                                    className="forminput"
                                    variant="filled"
                                />
                                <Space h={30} />
                                <Button 
                                    type="submit" 
                                    // className="submitbutton"
                                    disabled={isLoading} 

                                    color="teal" 
                                    size="md" 
                                    compact
                                    style={{ width: "275px"}}
                                    >
                                    Registrer bruker
                                </Button>

                                <Space h={25} />

                                <Text
                                    ta="center"
                                    fz="md"
                                    fw={475}
                                    >
                                    Har du bruker? 
                                    <Button onClick={login} variant="subtle" color="gray" compact >
                                        {<Text
                                            ta="center"
                                            fz="md"
                                            fw={475}>
                                            Logg inn
                                        </Text>}
                                    </Button>
                                </Text>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

