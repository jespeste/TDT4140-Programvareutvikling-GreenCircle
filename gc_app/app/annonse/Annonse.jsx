'use client';
import React from 'react';
import Link from 'next/link';
import './annonse.css';

export default function Annonse(props) {
	const PHONEICON =
		'http://127.0.0.1:8090/api/files/0ntieiylnsgmw2q/le6f34par706jch/phone_jGAryoagIa.png';
	let data = props.data[0];
	let owner = props.data[1];
	let phonestring = 'tel:' + owner.telephone;
	let messagestring = 'sms:' + owner.telephone;

	function seeMore() {
		console.log('seemore');
	}
	return (
		<div className="maincontainer">
			{data.is_listing && <div>Ønskes lånt</div>}
			{!data.is_listing && <div>Til leie</div>}
			{data.category != '' && <div>{data.category}</div>}
			<div className="container">
				<div className="photo-container">
					<img className="mainimage" src={data.image} alt="" />
				</div>
				<div className="text-container">
					<div className="title">
						<h1>{data.title}</h1>
					</div>
					<div className="person">
						<h4>{owner.firstName + ' ' + owner.lastName}</h4>
					</div>
					<div className="description">
						<p>{data.description}</p>
					</div>
				</div>
				<div className="info">
					<div className="contact">
						<button
							type="button"
							className="telephone"
							onClick={() => (window.location = phonestring)}
						>
							<img className="phoneicon" src={PHONEICON} />
						</button>
						<button
							type="button"
							className="messagebutton"
							onClick={() => (window.location.href = messagestring)}
						>
							Send melding
						</button>
					</div>
					<button type="button" className="seemorebutton">
						<Link href="/mainpost" className="link">
							Se mer
						</Link>
					</button>
				</div>
			</div>
		</div>
	);
}
