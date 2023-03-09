'use client'
import pb from '../lib/pocketbase';
import Annonsecontainer from './Annonsecontainer';
import Navbar from '../Navbar';
import { useState, useEffect } from 'react';
import './main.css';

export default function Annonsepage() {
	const [posts, setPostList] = useState([]); 
	
	const fetchPosts = async () => {
		try {
			const data = await pb.collection('posts').getList(1,100,{ 
				'$autoCancel': true,
				 expand: 'owner'
			});
			console.log(data);
			setPostList(data.items);



		} catch (err){
			console.log(err.isAbort);
		}
	}

	useEffect(()=>{
		fetchPosts();
	}, [])

	return (
		<div className="bigcontainer">
			<Navbar></Navbar>
			<div className="onerow">
				<input type="text" className="searchbar" placeholder="Søk etter motorsag eller skrujern!" />
				<div className="makeAccount">Søk!</div>
			</div>
			<Annonsecontainer data={posts}/>
		</div>
	);
}
