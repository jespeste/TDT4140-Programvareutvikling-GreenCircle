import React from 'react';
import Annonse from './Annonse';
import './annonsecontainer.css';
import { Flex, Container, Grid, SimpleGrid } from '@mantine/core';


export default function Annonsecontainer(props) {
	return (
        <div >

            <SimpleGrid 
                spacing={1}
                verticalSpacing={1}
                breakpoints={[
                    { minWidth: 'md', cols: 1 },
                    { minWidth: 'lg', cols: 2 },
                    { minWidth: 'xl', cols: 3 },
                ]} style={{backgroundColor: '', justifyContent: 'center'}}
            >
                {props.data.map((post) => {
                    return <
                        Grid.Col span={12} style={{backgroundColor: '', justifyContent: 'center'}}>
                            <Annonse id={post.id} data={post}></Annonse>
                        </Grid.Col>
                })}
		    </SimpleGrid>
            

		</div>
	);
}
