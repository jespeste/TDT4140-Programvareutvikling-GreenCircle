'use client'
import pb from '../lib/pocketbase';
import Annonsecontainer from './Annonsecontainer';
import Navbar from '../Navbar';
import { useState, useEffect } from 'react';
import { NativeSelect } from '@mantine/core';
import './main.css';


export default function Annonsepage() {
	const [posts, setPostList] = useState([]); 
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('');
	
	const categories = [
		{ value: '', label: 'Ingen kategori' },
		{ value: 'Småelektrisk', label: 'Småelektrisk' },
		{ value: 'Håndverktøy', label: 'Håndverktøy' },
		{ value: 'Spikerpistol og kompressor', label: 'Spikerpistol og kompressor' },
		{ value: 'Storelektrisk', label: 'Storelektrisk' },
		{ value: 'Målevertøy', label: 'Målevertøy' },
		{ value: 'Lim og festemidler', label: 'Lim og festemidler' },
		{ value: 'Maling', label: 'Maling' },
		{ value: 'Verktøyoppbevaring', label: 'Verktøyoppbevaring' }
	];

	const fetchPosts = async () => {
		try {
			const data = await pb.collection('posts').getList(1,100,{ 
				'$autoCancel': true,
				expand: 'owner',
				filter: `(title~"${search}" || description~"${search}") && category="${filter}"`
			});
			setPostList(data.items);
		} catch (err){
			console.log(err.isAbort);
		}
	}

	useEffect(()=>{
		fetchPosts();
	}, [search, filter])
	
	return (
		<div className="bigcontainer">
			<Navbar></Navbar>
			<div className="onerow">
				<input type="text" value={search} onChange={(event) => setSearch(event.target.value)} className="searchbar" placeholder="Søk etter motorsag eller skrujern!" />
				<NativeSelect
						data={categories}
						onChange={(event) => setFilter(event.currentTarget.value)}
						value={filter}
						radius="md"
						size="47"
				></NativeSelect>
			</div>
			<Annonsecontainer data={posts}/>
		</div>
	);
}
