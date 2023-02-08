import React from 'react';
import './index.js';

const Annonse = (props) => {
	if (props.description.length > 150) {
		let description = props.description.split(1, 148) + '...';
	}
	function callTelephone() {
		console.log('calledTelephone');
	}
	function sendMessage() {
		console.log('sentMessage');
	}
	function seeMore() {
		console.log('seeMore');
	}
	return (
		<div className="maincontainer">
			<div className="container">
				<div className="photo-container">
					<img className="mainimage" src={props.image.src} alt="" />
				</div>
				<div className="text-container">
					<div className="title">
						<h1>{props.tool}</h1>
					</div>
					<div className="person">
						<h4>
							{props.name}, {props.location}
						</h4>
					</div>
					<div className="description">
						<p>{props.description}</p>
					</div>
				</div>
				<div className="info">
					<div className="contact">
						<button type="button" className="telephone">
							<img className="phoneicon" src={props.phoneicon.src} onClick={callTelephone} />
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
};

export default Annonse;
