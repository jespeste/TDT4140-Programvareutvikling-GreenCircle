import React from 'react';
import { Annonse } from './index.js.js';
import './index.js.js';

export default function Annonsecontainer(props) {
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
