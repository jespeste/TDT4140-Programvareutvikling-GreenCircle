import React from 'react';
import Annonse from './Annonse';
import './annonsecontainer.css';
import { Grid, SimpleGrid, Flex } from '@mantine/core';

export default function Annonsecontainer(props) {
	const occupiedWidth = props.occupiedWidth;
	const itemWidth = 350;
	let showDelete = props.showDelete;

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
			{/* <Grid style={{ maxWidth: getMaxWidth(), backgroundColor: 'green' }}> */}
                <Flex
                    mih={50}
                    bg="rgba(0, 0, 0, 0)"
                    gap="md"
                    justify="center"
                    align="flex-start"
                    direction="row"
                    wrap="wrap"
                >
					{props.data.map((post) => {
						return (
							// <Grid.Col style={{ backgroundColor: '', justifyContent: 'center' }}>
                            <>
								<Annonse id={post.id} data={post} showDelete={showDelete} fetchPosts={props.fetchPosts}></Annonse>
                            </>
							// </Grid.Col>
						);
					})}

                </Flex>
				{/* </SimpleGrid> */}
			{/* </Grid> */}
		</div>
	);
}
