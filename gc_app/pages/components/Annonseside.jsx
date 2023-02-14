import React from 'react';
import './index.js';

const Annonseside = (props) => {
	let data = props.data;
	let location = data.location;
	let title = data.title;
	let owner = data.owner;
	return (
		<div className="annonseside">
			<div className="innerannonseside">
				<div className="bilde">
					<img src={data.image.src} alt="" className="morradi" />
				</div>
				<div className="divider">
					<div className="annonseinfo">
						<div className="annonseTittel">
							<h1>{title}</h1>
						</div>
						<div className="annonseLocation">
							<p>{location}</p>
						</div>
						<div className="beskrivelse">
							<p> {data.description}</p>
						</div>
					</div>
					<div className="profilinfo">
						<div className="profile">
							<div className="profileinfo2">
								<div className="profilepicture"></div>
								<div className="name">{owner.name}</div>
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
