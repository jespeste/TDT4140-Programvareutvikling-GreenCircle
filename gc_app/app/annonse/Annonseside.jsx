'use client';
import React from 'react';
import './annonseside.css';

export default function Annonseside(props) {
	let data = props.data[0][0];
	let owner = props.data[0][1];
	let mailstring = 'mailto:' + owner.email;
	let phonestring = 'tel:' + owner.telephone;
	function addToFavourites() {
		console.log(props.mordi);
		console.log('addToFavourites');
	}
	return (
		<div className="annonseside">
			<div className="innerannonseside">
				<div className="bilde">
					<img src={data.image} alt="" className="morradi" />
				</div>
				<div className="divider">
					<div className="annonseinfo">
						<div className="favourite">
							<button className="favouriteButton" onClick={addToFavourites}>
								&#9829; Legg til favoritt
							</button>
							<p>{data.numfavourites} har lagt til som favoritt</p>
						</div>
						<div>
							<div className="annonseTittel">
								<h1>{data.title}</h1>
							</div>
							<div className="annonseLocation">
								<p>{data.location}</p>
							</div>
							<div className="beskrivelse">
								<p> {data.description}</p>
							</div>
						</div>
					</div>
					<div className="profilinfo">
						<div className="profile">
							<div className="profileinfo2">
								<div className="profilepicture">
									<img className="avatar" src={owner.avatar}></img>
								</div>
								<div className="name">{owner.firstName + ' ' + owner.lastName}</div>
							</div>
							<div className="profilecontact">
								<button className="tlf" onClick={() => (window.location = phonestring)}>
									Telefon
								</button>
								<button className="mail" onClick={() => (window.location.href = mailstring)}>
									E-post
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
