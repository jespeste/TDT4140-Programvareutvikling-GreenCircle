import React from 'react';
import pb from '../lib/pocketbase';
import './annonse.css';

export default function Annonse(props) {
	let data = props.data[0];
	let owner = props.data[1];
	function callTelephone() {
		console.log('calledTelephone');
	}
	function sendMessage() {
		console.log('sentMessage');
	}
	function seeMore() {
		return props.annonseClicked(props.data);
	}
	return (
		<div className="maincontainer">
			<div className="container">
				<div className="photo-container">
					<img className="mainimage" src={data.image} alt="" />
				</div>
				<div className="text-container">
					<div className="title">
						<h1>{data.title}</h1>
					</div>
					<div className="person">
						<h4>
							{owner.firstName + ' ' + owner.lastName}, {data.location}
						</h4>
					</div>
					<div className="description">
						<p>{data.description}</p>
					</div>
				</div>
				<div className="info">
					<div className="contact">
						<button type="button" className="telephone">
							<img className="phoneicon" />
						</button>
						<button type="button" className="messagebutton">
							Send melding
						</button>
					</div>
					<button type="button" className="seemorebutton">
						Se mer
					</button>
				</div>
			</div>
		</div>
	);
}
