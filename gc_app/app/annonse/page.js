'use client'
import pb from '../lib/pocketbase';
import Annonsecontainer from './Annonsecontainer';
import Navbar from '../Navbar';
import { useState, useEffect } from 'react';
import './main.css';

export default function Annonsepage() {
	const [posts, setPostList] = useState([]); 
	const [search, setSearch] = useState('');
	
	let searchQuery = (e) => {
		var query = e.target.value;
		console.log(query);
		setSearch(query);
	}

	const fetchPosts = async () => {
		try {
			const data = await pb.collection('posts').getList(1,100,{ 
				'$autoCancel': true,
				expand: 'owner',
				filter: `title~"${search}"`
			});
			setPostList(data.items);
		} catch (err){
			console.log(err.isAbort);
		}
	}

	useEffect(()=>{
		fetchPosts();
	}, [search])
	
	return (
		<div className="bigcontainer">
			<Navbar></Navbar>
			<div className="onerow">
				<input type="text" value={search} onChange={(event) => setSearch(event.target.value)} className="searchbar" placeholder="Søk etter motorsag eller skrujern!" />
				<div className="makeAccount">Trenger vi deg? Nei</div>
			</div>
			<Annonsecontainer data={posts}/>
		</div>
	);
}
