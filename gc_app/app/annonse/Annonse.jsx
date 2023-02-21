import React from 'react';
import './index.js.js';

export default function Annonse(props) {
	if (props.data.description.length > 150) {
		let description = props.data.description.split(1, 148) + '...';
	}
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
					<img className="mainimage" src={props.data.image.src} alt="" />
				</div>
				<div className="text-container">
					<div className="title">
						<h1>{props.data.title}</h1>
					</div>
					<div className="person">
						<h4>
							{props.data.name}, {props.data.location}
						</h4>
					</div>
					<div className="description">
						<p>{props.data.description}</p>
					</div>
				</div>
				<div className="info">
					<div className="contact">
						<button type="button" className="telephone">
							<img className="phoneicon" src={props.data.phoneicon.src} onClick={callTelephone} />
						</button>
						<button type="button" className="messagebutton" onClick={sendMessage}>
							Send melding
						</button>
					</div>
					<button type="button" className="seemorebutton" onClick={seeMore}>
						Se mer
					</button>
				</div>
			</div>
		</div>
	);
}
