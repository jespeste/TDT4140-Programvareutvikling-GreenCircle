'use client';
import React from 'react';
import './annonse.css';

export default function Annonseside(props) {
	let data = props.data;
	function addToFavourites() {
		console.log(props.mordi);
		console.log('addToFavourites');
	}
	return (
		<div className="bg-white w-screen h-screen grid 70 30">
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
								<div className="profilepicture"></div>
								<div className="name">{data.owner.lastName}</div>
							</div>
							<div className="profilecontact">
								<button className="tlf">Call me</button>
								<button className="mail">E-mail</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
