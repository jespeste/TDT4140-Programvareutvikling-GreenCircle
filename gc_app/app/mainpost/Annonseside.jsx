'use client';
import React from 'react';
import './annonseside.css';
import { useState, useRef } from 'react';
import Loader from '../Loader';
import pb from 'app/lib/pocketbase';
import ReportPopUp from '../report/ReportForm';

export default function Annonseside(props) {
	let data = props.data;
	let owner = props.data.expand.owner;
	let mailstring = 'mailto:' + owner.email;
	let phonestring = 'tel:' + owner.telephone;
	const [location, setLocation] = useState('');
	const [lat, setLat] = useState(null);
	const [long, setLong] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const iframeRef = useRef(null);
	const geolocationAPI = navigator.geolocation;

	function getCity(coordinates) {
		var xhr = new XMLHttpRequest();
		var lat = coordinates[0];
		var lng = coordinates[1];
		xhr.open(
			'GET',
			'https://us1.locationiq.com/v1/reverse.php?key=pk.3148764d287076753405952377918cf4&lat=' +
				lat +
				'&lon=' +
				lng +
				'&format=json',
			true
		);
		xhr.send();
		xhr.onreadystatechange = processRequest;
		xhr.addEventListener('readystatechange', processRequest, false);

		function processRequest() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var response = JSON.parse(xhr.responseText);
				setLocation(response.address);
				return;
			}
		}
	}
	const coordinates = [
		parseFloat(data.location.split(',')[0]),
		parseFloat(data.location.split(',')[1])
	];
	if (location == '') {
		getCity(coordinates);
	}

	const getUserCoordinates = () => {
		if (!geolocationAPI) {
			console.log('Geolocation API is not available in your browser!');
		} else {
			geolocationAPI.getCurrentPosition((position) => {
				const { coords } = position;
				setLat(coords.latitude);
				setLong(coords.longitude);
			});
		}
	};
	getUserCoordinates();

	function iframeLoaded() {
		iframeRef.current.style = { visibility: 'visible' };
		setLoaded(true);
	}
	async function addToFavourites() {
		let user = pb.authStore.model;
		user.favourites.push(props.data.id);
		const record = await pb.collection('users').update(user.id, user);
	}

	function goBack() {
		window.history.back();
	}
	console.log(data.category);

	return (
		<div className="annonseside">
			<button className="goBack" onClick={goBack}>
				→
			</button>
			<div className="innerannonseside">
				<div className="tag">
					{!data.is_listing && <div className="green">Til leie</div>}
					{data.is_listing && <div className="red">Ønskes lånt</div>}
				</div>
				<div className="bilde">
					<img src={data.image} alt="" className="morradi" />
				</div>
				<div className="divider">
					<div className="annonsesideinfo">
						<div className="favourite">
							<button className="favouriteButton" onClick={addToFavourites}>
								&#9829; Legg til favoritt
							</button>
							<p>{data.numfavourites} har lagt til som favoritt</p>
						</div>
						<div>
							{data.category != undefined && <div>Kategori: {data.category}</div>}
							<div className="annonseTittel">
								<h1>{data.title}</h1>
							</div>
							<div className="annonseLocation">
								<p>
									{location.road}, {location.city} {location.postcode}
								</p>
							</div>
							<div className="beskrivelse">
								<p> {data.description}</p>
							</div>
							<div className="favourite">
								<ReportPopUp reporter={owner} reportedUser={undefined} reportedPost={data} />
							</div>
						</div>
					</div>
					<div className="annonsesideprofilinfo">
						<div className="profile">
							<div className="annonsesideprofileinfo2">
								<div className="annonsesideprofilepicture">
									<img className="annonsesideavatar" src={owner.avatar}></img>
								</div>
								<div className="annonsesidename">{owner.firstName + ' ' + owner.lastName}</div>
							</div>
							<div className="annonsesideprofilecontact">
								<button className="annonsesidetlf" onClick={() => (window.location = phonestring)}>
									Telefon
								</button>
								<button
									className="annonsesidemail"
									onClick={() => (window.location.href = mailstring)}
								>
									E-post
								</button>
							</div>
						</div>
						<div height={300} width="100%">
							{!loaded && <Loader></Loader>}
							<iframe
								src={
									'https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d9394577.855917023!2d4.244162587814275!3d54.909975819805574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e2!4m4!2s' +
									lat +
									'%2C' +
									long +
									'!3m2!1d' +
									lat +
									'!2d' +
									long +
									'!4m4!2s' +
									coordinates[0] +
									'%2C' +
									coordinates[1] +
									'!3m2!1d' +
									coordinates[0] +
									'!2d' +
									coordinates[1] +
									'!5e0!3m2!1sno!2sno!4v1678047228005!5m2!1sno!2sno'
								}
								height={300}
								width="100%"
								style={{ visibility: 'hidden' }}
								allowfullscreen
								ref={iframeRef}
								onLoad={iframeLoaded}
							></iframe>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
