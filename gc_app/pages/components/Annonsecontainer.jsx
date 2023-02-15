import React from 'react';
import { Annonse } from './index.js';
import './index.js';

const Annonsecontainer = (data) => {
	let items = data.data;
	function annonseClicked(dat) {
		return data.annonseClicked(dat);
	}
	return (
		<div className="outercontainer">
			<div className="annonsecontainer">
				{items.map((item) => {
					return <Annonse data={item} annonseClicked={annonseClicked}></Annonse>;
				})}
			</div>
		</div>
	);
};
export default Annonsecontainer;
