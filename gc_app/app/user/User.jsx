'use client';
import pb from '../lib/pocketbase';
import './user.css';
import pb from '../lib/pocketbase';
import Annonsecontainer from '../annonse/Annonsecontainer';
import { useState } from 'react';
import { Switch } from '@mantine/core';
import ReportPopUp from '../report/ReportForm';

function getUser() {
	return pb.authStore.model;
}

export default function User(props) {
	const user = getUser();
	let posts = props.posts.filter((post) => post.owner === user.id);
	let favourites = props.posts.filter((post) => user.favourites.includes(post.id));
	let postsList = [];
	let favoritesList = [];
	for (let i = 0; i < posts.length; i++) {
		let tuple = [];
		tuple.push([posts[i], user]);
		postsList.push(tuple);
	}
	for (let i = 0; i < favourites.length; i++) {
		let tuple = [];
		tuple.push([favourites[i], user]);
		favoritesList.push(tuple);
	}
	const [show, setShow] = useState(false);
	function changeView() {
		setShow(!show);
	}
	return (
		<div className="root">
			<div className="profile">
				<div className="profileinfo2">
					<div className="profilepicture">
						<img className="avatar" src={user.avatar}></img>
					</div>
				</div>
				<div className="name">
					{user.verified && <div className="verified">&#10003;</div>}
					{user.firstName + ' ' + user.lastName}
				</div>
				<div className="profilecontact">
					<button className="tlf">Telefon</button>
					<button className="mail">E-post</button>
				</div>
				<div className="favourite">
					{/* TODO: the reporter should be the active user, whereas the reportedUser should be the user displayed on the page.
					Currently the both reporter and reportedUser is always set to the active user. */}
					<ReportPopUp reporter={getUser()} reportedUser={getUser()} reportedPost={undefined}/>
				</div>
			</div>
			<div className="posts">
				<Switch
					onChange={changeView}
					color="green"
					onLabel={'Favoritter'}
					offLabel={'Dine annonser'}
					size="xl"
				></Switch>
				{!show && <Annonsecontainer data={postsList}></Annonsecontainer>}
				{show && <Annonsecontainer data={favoritesList}></Annonsecontainer>}
			</div>
		</div>
	);
}
