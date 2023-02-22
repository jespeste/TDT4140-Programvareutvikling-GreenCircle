'use client';
import React from 'react';
import './annonse.css';

export default function Annonse(props) {
	// let owner = props.data[0];
	// let data = props.data[1];
	// const phone_icon = 'http://127.0.0.1:8090/api/files/images/n3xr4wdlooslg5h/phone_Ng547uwK8o.png';
	// const telephoneHref = 'tel:+' + owner.phone;
	function callTelephone() {
		console.log('calledTelephone');
	}
	function sendMessage() {
		console.log('sentMessage');
	}
	// function seeMore() {
	// 	return props.annonseClicked(props.data[1]);
	// }
	return (
		<div className="maincontainer">
			<div className="container">
				<div className="photo-container">
					{/* <img className="mainimage" src={data.picture} alt="" /> */}
				</div>
				<div className="text-container">
					<div className="title">
						{/* <h1>{data.title}</h1> */}
					</div>
					<div className="person">
						<h4>
							{/* {owner.name}, {owner.location} */}
						</h4>
					</div>
					<div className="description">
						{/* <p>{data.description}</p> */}
					</div>
				</div>
				<div className="info">
					<div className="contact">
						<button type="button" className="telephone">
							{/* <img className="phoneicon" src={phone_icon} onClick={callTelephone} /> */}
						</button>
						<button
							type="button"
							className="messagebutton"
							// onClick={sendMessage}
							// href={telephoneHref}
						>
							Send melding
						</button>
					</div>
					{/* <button type="button" className="seemorebutton" onClick={seeMore}> */}
						Se mer
					{/* </button> */}
				</div>
			</div>
		</div>
	);
}
