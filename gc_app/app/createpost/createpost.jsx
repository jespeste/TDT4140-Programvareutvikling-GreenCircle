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

export default function CreatePost() {
	const [url, setUrl] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [checked, setChecked] = useState(false);
	const [value, setValue] = useState('');
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
		var post = new Post(checked, title, description, url, getOwner(), 0, value);
		createPost(post);
	};

	function getOwner() {
		const owner = pb.authStore.model.id;
		return owner;
	}

	async function createPost(post) {
		try {
			const record = await pb.collection('posts').create(post);
			alert('Post created.');
		} catch (e) {
			alert(e);
		}
	}

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
					<Textarea
						value={description}
						onChange={(event) => setDescription(event.target.value)}
						placeholder=""
						label="Autosize with no rows limit"
						autosize
						minRows={2}
					/>
					<NativeSelect
						label="Velg kategori"
						allowdeselect
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
				</form>
			</Container>
		</div>
	);
}
