'use client';
import pb from '../lib/pocketbase';
import './user.css';

function getUser() {
	return pb.authStore.model;
}

async function getPostsFromUser(user_id) {
	let posts = await pb.collection('posts').getList();
}

async function getPosts() {
	const data = await pb.collection('posts').getList();
	return data.items;
}

export default function User() {
	pb.autoCancellation(false);
	const user = getUser();
	return (
		<div className="root">
			<div className="name">
				{user.firstName} {user.lastName}
			</div>
			<div className="avatar">
				<img src={user.avatar}></img>
			</div>
			{user.verified && <div className="verified"></div>}
			<div className="email">{user.email}</div>
			<div className="posts"></div>
			<div className="favourites"></div>
			{user.telephone == '' && <div className="telephone">{user.telephone} </div>}
		</div>
	);
}
