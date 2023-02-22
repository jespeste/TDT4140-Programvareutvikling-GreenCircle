'use client';
import pb from '../lib/pocketbase';
import './user.css';
import Annonsecontainer from '../annonse/Annonsecontainer';

function getUser() {
	return pb.authStore.model;
}
async function getPost(post_id) {
	const post = await pb.collection('posts').getOne(post_id);
	return post;
}
async function getPosts(post_ids) {
	let posts = [];
	for (let i = 0; i < post_ids.length; i++) {
		let post = await getPost(post_ids[i]);
		posts.push(post);
	}
	console.log(posts);
	return posts;
}

export default function User() {
	pb.autoCancellation(false);
	const user = getUser();
	const posts = getPosts(user.postings);
	const favs = getPosts(user.favourites);
	return (
		<div className="root">
			<div className="name">
				{user.firstName} {user.lastName}
			</div>
			<div className="avatar">
				<img src={user.avatar}></img>
			</div>
			{user.verified && <div className="verified"></div>}
			{user.emailVisibility && <div className="email">{user.email}</div>}
			<div className="posts">{/* <Annonsecontainer data={posts} /> */}</div>
			<div className="favourites">{/* <Annonsecontainer data={favs} /> */}</div>
			{user.telephone == '' && <div className="telephone">{user.telephone} </div>}
		</div>
	);
}
