import React from 'react';
import './index.js';

const Annonseside = (props) => {
	let data = props.data;
	function addToFavourites() {
		console.log('addToFavourites');
	}

	return (
		<div className="annonseside">
			<div className="innerannonseside">
				<div className="bilde">
					<img src={data.image.src} alt="" className="morradi" />
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
								<div className="name">{data.owner.name}</div>
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
};

export default Annonseside;
