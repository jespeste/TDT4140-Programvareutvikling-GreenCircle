'use client'
import pb from '../../lib/pocketbase';
import Annonseside from '../Annonseside';
import Navbar from '../../Navbar';
import 'app/mainpost/main.css';
import { useState, useEffect } from 'react';

export default function Annonsepage({ params }) {
	const id = params.id;
	const [post, setPost] = useState({});
	const [isLoading, setLoading] = useState(true);

	const getPost = async () => {
		setLoading(true);
		try {
			const reportData = await pb.collection('posts').getOne(id,{
				expand: "owner, booker"
			});
			console.log(reportData);
			setPost(reportData);
			setLoading(false);
		} catch (err){
			console.log(err.isAbort);
		}
	}

	useEffect(()=>{
		getPost();
	},[])

	return (
		<div className="bigcontainer">
			<Navbar></Navbar>
			{!isLoading &&
			<Annonseside data={post}></Annonseside>
			}
		</div>
	);
}
