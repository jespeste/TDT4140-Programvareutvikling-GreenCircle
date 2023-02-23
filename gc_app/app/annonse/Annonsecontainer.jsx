import React from 'react';
import Annonse from './Annonse';
import './annonsecontainer.css';

export default function Annonsecontainer(props) {
	function annonseClicked(data) {
		return props.data.annonseClicked(data);
	}
	return (
		<div className="outercontainer">
			<div className="annonsecontainer">
				{props.data.map((tuple) => {
					return <Annonse id={tuple[0][0].id} data={tuple[0]}></Annonse>;
				})}
			</div>
		</div>
	);
}
