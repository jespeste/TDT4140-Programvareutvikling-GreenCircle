import React from 'react';
import ReviewView from './review/ReviewView';
import './reviews-view.css';
import { Flex } from '@mantine/core';

export default function ReviewContainer(props) {
	return (
        <Flex
            mih={50}
            // bg="rgba(0, 0, 0, .3)"
            gap="xs"
            justify="center"
            align="center"
            direction="column"
            wrap="nowrap"
        >
            {props.reviewsData.map((review) => {
                return <ReviewView reviewData={review} />;
            })}
		</Flex>
	);
}
