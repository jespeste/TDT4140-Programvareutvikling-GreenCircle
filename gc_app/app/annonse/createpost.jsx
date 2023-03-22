'use client';
import pb from '../lib/pocketbase';
import { Container, FileInput, Switch, Title } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { Textarea } from '@mantine/core';
import { Button } from '@mantine/core';
import { Checkbox } from '@mantine/core';
import { NativeSelect } from '@mantine/core';
import { createStyles } from '@mantine/core';
import { Card } from '@mantine/core';
import { Title } from '@mantine/core';
import { Switch } from '@mantine/core';
import { Group } from '@mantine/core';
import { Space } from '@mantine/core';
import { useState } from 'react';

import './createpost.css';

import Post from './Post';

export default function CreatePost(props) {
	const [url, setUrl] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [checked, setChecked] = useState(false);
	const [value, setValue] = useState('');
	const [address, setAddress] = useState('');
	const [lat, setLat] = useState(null);
	const [long, setLong] = useState(null);
	const geolocationAPI = navigator.geolocation;
	const data = [
		{ value: null, label: 'Ingen kategori' },
		{ value: 'Småelektrisk', label: 'Småelektrisk' },
		{ value: 'Håndverktøy', label: 'Håndverktøy' },
		{ value: 'Spikerpistol og kompressor', label: 'Spikerpistol og kompressor' },
		{ value: 'Storelektrisk', label: 'Storelektrisk' },
		{ value: 'Målevertøy', label: 'Målevertøy' },
		{ value: 'Lim og festemidler', label: 'Lim og festemidler' },
		{ value: 'Maling', label: 'Maling' },
		{ value: 'Verktøyoppbevaring', label: 'Verktøyoppbevaring' }
	];
	const APP = {
		TOKEN: 'pk.3e21916e151f4d42374fdc631eded07a',
		SEARCHURL: 'https://eu1.locationiq.com/v1/search?'
	};

	const useStyles = createStyles((theme) => ({
		container: {
			backgroundColor: theme.colors.green[3],
			borderRadius: theme.radius.md,
			padding: 10
		}
	}));
	const { classes } = useStyles();

	const closePopup = () => {
		props.setPopUpClose();
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (address === '') {
			getUserCoordinates();
			let location = '' + lat + ',' + long;
			var post = new Post(checked, title, description, url, getOwner(), 0, value, location);
			createPost(post);
		} else {
			let urlSearch = `${APP.SEARCHURL}key=${APP.TOKEN}&q=${address}&format=json`;
			fetch(urlSearch)
				.then((resp) => {
					if (!resp.ok) throw new Error(resp.statusText);
					return resp.json();
				})
				.then((data) => {
					setLat(data[0].lat);
					setLong(data[0].lon);
					let location = '' + data[0].lat + ',' + data[0].lon;
					var post = new Post(checked, title, description, url, getOwner(), 0, value, location);
					createPost(post);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	function getOwner() {
		const owner = pb.authStore.model.id;
		return owner;
	}

	async function createPost(post) {
		try {
			const record = await pb.collection('posts').create(post);
			let user = pb.authStore.model;
			user.posts.push(record.id);
			const userRecord = await pb.collection('users').update(user.id, user);
			alert('Post created.');
			props.setPopUpClose();
		} catch (e) {
			alert(e);
		}
	}

	const getUserCoordinates = () => {
		if (!geolocationAPI) {
			console.log('Geolocation API is not available in your browser!');
		} else {
			geolocationAPI.getCurrentPosition(
				(position) => {
					const { coords } = position;
					setLat(coords.latitude);
					setLong(coords.longitude);
				},
				(error) => {
					console.log('Something went wrong getting your position!');
				}
			);
		}
	};
	return (
		<div className="createpostroot">
			<Card shadow="sm" padding="lg" radius="md" withBorder style={{ paddingBottom: '35px' }}>
				<Container className="createpostcontainer">
					{/* <h1 className="h1">Ny annonse</h1> */}
					<Title>Ny annonse</Title>
					<form onSubmit={handleSubmit}>
						{/* <FileInput label="Last opp Bilde:" placeholder="Bilde" /> */}
						<TextInput
							className="textinput"
							value={url}
							onChange={(event) => setUrl(event.target.value)}
							placeholder="Bildeadresse (url)"
							withAsterisk
						/>
						<TextInput
							className="textinput"
							value={title}
							maxlength={18}
							onChange={(event) => setTitle(event.target.value)}
							placeholder="Tittel"
							withAsterisk
						/>
						<TextInput
							className="textinput"
							value={address}
							onChange={(event) => setAddress(event.target.value)}
							placeholder="Adresse"
						/>
						<Textarea
							className="textinput"
							value={description}
							onChange={(event) => setDescription(event.target.value)}
							placeholder="Beskrivelse"
							autosize
							minRows={2}
						/>
						<NativeSelect
							className="textinput"
							data={data}
							onChange={(event) => setValue(event.currentTarget.value)}
							value={value}
						></NativeSelect>
						<Checkbox
							className="textinput"
							label="Ønskes lånt"
							checked={checked}
							onChange={(event) => setChecked(event.currentTarget.checked)}
						/>
						<Space h={20}></Space>
						<div>
							<Group position="center" grow>
								<Button variant="outline" compact type="submit" color="green" radius="md">
									Publisér annonse
								</Button>
								<Button
									variant="outline"
									compact
									type="button"
									color="red"
									radius="md"
									onClick={closePopup}
								>
									Avbryt
								</Button>
							</Group>
						</div>
					</form>
				</Container>
			</Card>
		</div>
	);
}
