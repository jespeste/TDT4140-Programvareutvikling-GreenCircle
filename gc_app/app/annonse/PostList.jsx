'use client';
import React from 'react';
import Annonse from './Annonse';
import './postList.css';

export default function postList(props) {
	let tuples = [];
	for (let i = 0; i < props.posts.length; i++) {
		let tuple = [];
		let curpost = props.posts[i];
		let owner = props.users.find((user) => user.id == curpost.owner);
		tuple.push(owner, curpost);
		tuples.push(tuple);
	}
	function annonseClicked(data) {
		return props.annonse(data);
	}
	return (
			<div className="postscontainer">
				{tuples.map((tuple) => {
					return (
						<div>
							<Annonse key={tuple[1].id} data={tuple} annonseClicked={annonseClicked}></Annonse>
						</div>
						
					);
				})}
			</div>
	);
}
