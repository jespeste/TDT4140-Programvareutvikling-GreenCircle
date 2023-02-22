import React from 'react';

export default function Annonse(props) {
	function callTelephone() {
		console.log('calledTelephone');
	}
	function sendMessage() {
		console.log('sentMessage');
	}

	return (
		<div className="maincontainer">
			<div className="container">
				<div className="photo-container">
					<img className="mainimage" src={props.data.image} alt="" />
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
							<img className="phoneicon" src={props.data.phoneicon} onClick={callTelephone} />
						</button>
						<button type="button" className="messagebutton" onClick={sendMessage}>
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
