"use client";
import pb from '../lib/pocketbase';
import { Container, FileInput } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { Textarea } from '@mantine/core';
import { Button } from '@mantine/core';
import { createStyles } from '@mantine/core';
import { useState } from 'react';
import Post from './Post';

export default function CreatePost() {
	const [url, setUrl] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");


	const useStyles = createStyles((theme) => ({
		container: {
			backgroundColor: theme.colors.green[3],
			borderRadius: theme.radius.md,
			padding: 10
		}
	}))

	const { classes }  = useStyles();

	const handleSubmit = (event) => {
		event.preventDefault();
		var post = new Post(true, title, description, url, getOwner());
		createPost(post);
	};

	function getOwner(){
		const owner = pb.authStore.model;
		return owner;
	}

	async function createPost(post) {
		try {
			const record = await pb.collection('posts').create(post);
			alert('User Created.');
		} catch (e) {
			alert(e);
		}
	}

	return (<div className='root'>
		<Container size={200} px={10} className={classes.container}>
			<form onSubmit={handleSubmit}>
				{/* <FileInput label="Last opp Bilde:" placeholder="Bilde" /> */}

				<TextInput value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Bildeadresse (url)" label="Url" withAsterisk/>
				<TextInput value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Tittel" label="Tittel" withAsterisk/>
				<Textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="" 
					label="Autosize with no rows limit" autosize minRows={2}/>
				<Button type="submit" color="green" radius="lg">Lag annonse</Button>			
			</form>
		</Container>
		</div>
	);
}
