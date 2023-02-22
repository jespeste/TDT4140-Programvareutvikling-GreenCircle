import React from 'react';
import Annonse from './Annonse';

export default function Annonsecontainer(props) {
	console.log(props.data);
	function annonseClicked(data) {
		return props.data.annonseClicked(data);
	}
	return (
		<div className="outercontainer">
			<div className="annonsecontainer">
				{props.data.map((item) => {
					return <Annonse data={item} annonseClicked={annonseClicked}></Annonse>;
				})}
			</div>
		</div>
	);
}
