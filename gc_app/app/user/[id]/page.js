'use client'
import User from '../User';
import Navbar from '../../Navbar';
import pb from '../../lib/pocketbase';
import { useState, useEffect } from 'react';

export default function Page({ params }) {
    const id = params.id;
	const [user, setUser] = useState({});
	const [posts, setPosts] = useState({});
	const [isLoadingUser, setLoadingUser] = useState(true);
	const [isLoadingPosts, setLoadingPosts] = useState(true);

    
	const getUser = async () => {
		setLoadingUser(true);
		try {
			const reportData = await pb.collection('users').getOne(id);
			console.log(reportData);
			setUser(reportData);
			setLoadingUser(false);
		} catch (err){
			console.log(err.isAbort);
		}
	}

	// const getPosts = async () => {
	// 	setLoadingPosts(true);
	// 	try {
	// 		const reportData = await pb.collection('posts').getList(1,100,{
    //             expand: 'owner, booker',
    //         });
	// 		console.log(reportData);
	// 		setPosts(reportData);
	// 		setLoadingPosts(false);
	// 	} catch (err){
	// 		console.log(err.isAbort);
	// 	}
	// }
	useEffect(()=>{
		getUser();
	},[])

    // useEffect(()=>{
	// 	getPosts();
	// },[])
	// const user = await getUser(params.id);
	// const posts = await getPosts();
	return (
		<div>
			<Navbar page="user"></Navbar>
			{/* <User posts={posts} user={user} ></User> */}
            {(!isLoadingUser) &&
                <User user={user} ></User>
			}
		</div>
	);
}
