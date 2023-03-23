'use'
import React from 'react';
import { Grid, SimpleGrid, Flex } from '@mantine/core';
import BookingView from '../booking/BookingView';

export default function BookingsView(props) {
	return (
		<div>
            <Flex
                mih={50}
                bg="rgba(0, 0, 0, 0)"
                gap="md"
                justify="center"
                align="flex-start"
                direction="row"
                wrap="wrap"
            >
                {props.bookingsOwner.map((post) => {
                    return (
                        <>
                            <BookingView post={post}></BookingView>
                        </>
                    );
                })}
            </Flex>
		</div>
	);
}
