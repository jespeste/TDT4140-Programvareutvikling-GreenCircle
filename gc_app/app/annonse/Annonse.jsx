'use client';
import React from 'react';
import Link from 'next/link';
import './annonse.css';

export default function Annonse(props) {
	const PHONEICON =
		'http://127.0.0.1:8090/api/files/0ntieiylnsgmw2q/le6f34par706jch/phone_jGAryoagIa.png';
	let data = props.data;
	let owner = props.data.expand.owner;
	let phonestring = 'tel:' + owner.telephone;
	let messagestring = 'sms:' + owner.telephone;

	return (
		<div className="annonsemaincontainer">
			<div className="annonsetag">
				{data.is_listing && <div className="annonsered">Ønskes lånt</div>}
				{!data.is_listing && <div className="annonsegreen">Lånes ut</div>}
			</div>
			{data.category != '' && <div>{data.category}</div>}
			<div className="Annonsecontainer">
				<div className="annonsephoto-container">
					<img className="annonsemainimage" src={data.image} alt="" />
				</div>
				<div className="annonsetext-container">
					<div className="annonsetitle">
						<h1>{data.title}</h1>
					</div>
					<div className="annonseperson">
						<h4>{owner.firstName + ' ' + owner.lastName}</h4>
					</div>
					<div className="annonsedescription">
						<p>{data.description}</p>
					</div>
				</div>
				<div className="annonseinfo">
					<div className="annonsecontact">
						<button
							type="button"
							className="telephone"
							onClick={() => (window.location = phonestring)}
						>
							<img className="annonsephoneicon" src={PHONEICON} />
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
						<Link href={`/mainpost/${data.id}`} className="annonselink">
							Se mer
						</Link>
					</button>
				</div>
			</div>
		</div>
	);
}
