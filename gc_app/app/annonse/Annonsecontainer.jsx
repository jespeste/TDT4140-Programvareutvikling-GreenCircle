import React from 'react';
import Annonse from './Annonse';
import './annonsecontainer.css';
import { Grid, SimpleGrid } from '@mantine/core';

export default function Annonsecontainer(props) {
	const occupiedWidth = props.occupiedWidth;
	const itemWidth = 350;

	function getMaxWidth() {
		let propCount = props.data.length;
		if (propCount >= 3) {
			return itemWidth * 3;
		} else {
			return itemWidth * propCount;
		}
	}

	return (
		<div>
			<Grid style={{ maxWidth: getMaxWidth(), backgroundColor: '' }}>
				<SimpleGrid
					spacing={1}
					cols={3}
					breakpoints={[
						{ maxWidth: occupiedWidth - itemWidth * 2, cols: 1 },
						{ maxWidth: occupiedWidth - itemWidth, cols: 2 },
						{ maxWidth: occupiedWidth, cols: 3 }
					]}
					style={{ backgroundColor: '', justifyContent: 'center' }}
				>
					{props.data.map((post) => {
						return (
							<Grid.Col style={{ backgroundColor: '', justifyContent: 'center' }}>
								<Annonse id={post.id} data={post}></Annonse>
							</Grid.Col>
						);
					})}
				</SimpleGrid>
			</Grid>
		</div>
	);
}
