'use client';
import pb from '../lib/pocketbase';
import Annonsecontainer from './Annonsecontainer';
import Navbar from '../Navbar';
import { useState, useEffect } from 'react';
import { NativeSelect } from '@mantine/core';
import { Button } from '@mantine/core';

import './main.css';
import CreatePost from './createpost';

export default function Annonsepage() {
	const [posts, setPostList] = useState([]);
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('');
	const [category, setCategory] = useState('');
	const [popUp, setPopUp] = useState(false);

	const categories = [
		{ value: '', label: 'Alle verktøy' },
		{ value: 'Småelektrisk', label: 'Småelektrisk' },
		{ value: 'Håndverktøy', label: 'Håndverktøy' },
		{ value: 'Spikerpistol og kompressor', label: 'Spikerpistol og kompressor' },
		{ value: 'Storelektrisk', label: 'Storelektrisk' },
		{ value: 'Måleverktøy', label: 'Måleverktøy' },
		{ value: 'Lim og festemidler', label: 'Lim og festemidler' },
		{ value: 'Maling', label: 'Maling' },
		{ value: 'Verktøyoppbevaring', label: 'Verktøyoppbevaring' }
	];

	const fetchPosts = async () => {
		try {
			const data = await pb.collection('posts').getList(1, 100, {
				$autoCancel: true,
				expand: 'owner',
				filter: `(title~"${search}" || description~"${search}") ${category}`
			});
			setPostList(data.items);
		} catch (err) {
			console.log(err.isAbort);
		}
	};

	useEffect(() => {
		if (filter !== '') {
			setCategory(`&& category="${filter}"`);
		} else {
			setCategory('');
		}
		fetchPosts();
	}, [search, filter, category, popUp])

	const handlePopOpen = () => {
		setPopUp(true);
	}

	const setPopUpClose = () => {
		setPopUp(false);
		console.log("updated");
	}

	return (
		<div className="bigcontainer">
			<Navbar></Navbar>
			<div className="onerow">
				<Button color="green" radius="xl" size="md" type='button' onClick={handlePopOpen}>
					Ny Annonse
				</Button>
				<input type="text" value={search} onChange={(event) => setSearch(event.target.value)} className="searchbar" placeholder="Søk etter motorsag eller skrujern!" />
				<NativeSelect
					data={categories}
					onChange={(event) => setFilter(event.currentTarget.value)}
					value={filter}
					radius="md"
					size="47"
				></NativeSelect>
			</div>
			<div className='popup'>
				<div className='outercontainer'>
					<div className='reportcontainer'>
						{popUp && <CreatePost setPopUpClose={setPopUpClose}/>}
					</div>
				</div>
			</div>
			<Annonsecontainer data={posts}/>

		</div>
	);
}
