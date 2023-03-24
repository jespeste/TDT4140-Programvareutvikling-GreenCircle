import React from 'react';
import ReportView from '../report/ReportView';
import './reports-view.css';
import { Grid, SimpleGrid, Card, Flex} from '@mantine/core';

export default function ReportContainer(props) {

    const occupiedWidth = props.occupiedWidth;
    const itemWidth = 400;
    
    function getMaxWidth() {
        let propCount = props.data.length;
        if (propCount >= 2) {
            return itemWidth * 4;
        } else {
            return itemWidth * propCount;
        }
    }

	return (
        <div>                
            {/* <Grid style={{maxWidth: getMaxWidth(), backgroundColor: ''}} > */}
                {/* <SimpleGrid */}
                    {/* spacing={1}
                    // cols={2}
                    breakpoints={[
                        { minWidth: occupiedWidth - itemWidth * 2, cols: 1 },
                        { minWidth: occupiedWidth - itemWidth, cols: 2 },
                        // { maxWidth: occupiedWidth , cols: 3 },
                    ]}
                    style={{ backgroundColor: '', justifyContent: 'center' }}
                    > */}
                    <Flex
                    mih={50}
                    maw={1500}
                    bg="rgba(0, 0, 0, 0)"
                    gap="md"
                    justify="center"
                    align="flex-start"
                    direction="row"
                    wrap="wrap"
                >

                    {props.data.map((report) => {
                        return (
                            // <Grid.Col style={{ backgroundColor: '', justifyContent: 'center' }}>
                            <ReportView reportData={report}></ReportView>
                            // {/* </Grid.Col> */}
                            );
                        })}
                </Flex>
                {/* </SimpleGrid> */}
            {/* </Grid> */}
		</div>
	);
}
