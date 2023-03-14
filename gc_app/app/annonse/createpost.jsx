'use client';
import pb from '../lib/pocketbase';
import { Container, FileInput } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { Textarea } from '@mantine/core';
import { Button } from '@mantine/core';
import { Checkbox } from '@mantine/core';
import { NativeSelect } from '@mantine/core';
import { createStyles } from '@mantine/core';
import { useState } from 'react';

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

	const handleSubmit = (event) => {
		event.preventDefault();
		if (address === '') {
			getUserCoordinates();
			let location = '' + lat + ',' + long;
			var post = new Post(checked, title, description, url, getOwner(), 0, value, location);
			createPost(post);
			props.setPopUp(false);
		} else {
			let urlSearch = `${APP.SEARCHURL}key=${APP.TOKEN}&q=${address}&format=json`;
			fetch(urlSearch)
				.then((resp) => {
					if (!resp.ok) throw new Error(resp.statusText);
					return resp.json();
				})
				.then((data) => {
					console.log(data[0].lat);
					console.log(data[0].lon);
					setLat(data[0].lat);
					setLong(data[0].lon);
					let location = '' + data[0].lat + ',' + data[0].lon;
					console.log(location);
					var post = new Post(checked, title, description, url, getOwner(), 0, value, location);
					createPost(post);
				})
				.catch((err) => {
					console.error(err);
				});
			console.log(lat + 'Yo wassup');
			console.log(long);
			props.setPopUp(false);
			// let location = '' + lat + ',' + long;
			// console.log(location);
			// var post = new Post(checked, title, description, url, getOwner(), 0, value, location);
			// createPost(post);
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
		<div className="root">
			<Container size={200} px={10} className={classes.container}>
				<form onSubmit={handleSubmit}>
					{/* <FileInput label="Last opp Bilde:" placeholder="Bilde" /> */}

					<TextInput
						value={url}
						onChange={(event) => setUrl(event.target.value)}
						placeholder="Bildeadresse (url)"
						label="Url"
						withAsterisk
					/>
					<TextInput
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						placeholder="Tittel"
						label="Tittel"
						withAsterisk
					/>
					<TextInput
						value={address}
						onChange={(event) => setAddress(event.target.value)}
						label="Adresse"
					/>
					<Textarea
						value={description}
						onChange={(event) => setDescription(event.target.value)}
						placeholder=""
						label="Beskrivelse"
						autosize
						minRows={2}
					/>
					<NativeSelect
						label="Velg kategori"
						data={data}
						onChange={(event) => setValue(event.currentTarget.value)}
						value={value}
					></NativeSelect>
					<Checkbox
						label="Ønskes lånt"
						checked={checked}
						onChange={(event) => setChecked(event.currentTarget.checked)}
					/>
					<Button type="submit" color="green" radius="lg">
						Lag annonse
					</Button>
					<Button type='button' color="red" radius="md">
						Lukk
					</Button>
				</form>
			</Container>
		</div>
	);
}
