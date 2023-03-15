import React from 'react';
import Annonse from './Annonse';
import './annonsecontainer.css';

export default function Annonsecontainer(props) {
	return (
		<div className="annonsecontaineroutercontainer">
			<div className="annonsecontainer">
				{props.data.map((post) => {
					return <Annonse id={post.id} data={post}></Annonse>;
				})}
			</div>
		</div>
	);
}
