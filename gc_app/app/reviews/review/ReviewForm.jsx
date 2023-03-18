"use client";
import pb from '../../lib/pocketbase';
import { Container, FileInput, Space } from '@mantine/core';
import { Textarea } from '@mantine/core';
import { Button } from '@mantine/core';
import { Group } from '@mantine/core';
import { createStyles } from '@mantine/core';
import { Rating } from '@mantine/core';
import { useState } from 'react';
import Review from './Review';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Title, ActionIcon, Text } from '@mantine/core';


/**
 * Review button that opens up a form for reviewing inapproptiate users/posts.
 * 
 * @param {*} reviewer - The reviewing user.
 * @param {*} reviewedUser - The reviewed user.
 * @param {*} reviewedPost - The reviewed post.
 * @returns - A button which once clicked opens up a review-form.
 */
export default function ReviewPopUp({reviewer, reviewedUser, reviewedPost}) {
    const [opened, { open, close }] = useDisclosure(false);
    const [description, setDescription] = useState('');
	const [rating, setRating] = useState(2);

	function getActiveUser(){
		const activeUser = pb.authStore.model.id;
		return activeUser;
	}

	function isUserReview() {
		return !(reviewedUser === undefined)
	}

	function isPostReview() {
		return !(reviewedPost === undefined);
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		var reviewedUserID = '';
		if (isUserReview()) {
			reviewedUserID = reviewedUser.id;
		}
		var reviewedPostID = '';
		if (isPostReview()) {
			reviewedPostID = reviewedPost.id
		}

		var review = new Review(
        	rating, description, getActiveUser(), reviewedUserID, reviewedPostID);
		createReview(review);
	};

	function getReviewTitle() {
		var title = "Vurdér - "
		// if (isUserReview()) {
		// 	title += reviewedUser.id;
		// }
		if (isPostReview()) {
			title += reviewedPost.title;
		}
		return title;
	}

	async function createReview(review) {
		try {
			const record = await pb.collection('reviews').create(review);
			alert('Vurdering sendt!' + '\n' +
			'Rating: ' + review.rating + '\n' +
			'Beskrivelse: ' + review.description + '\n' +
			'Vurdert bruker: ' + review.reviewedUser + '\n' +
			'Vurdert annonse: ' + review.reviewedPost + '\n' +
			'Vurdert av: ' + review.reviewer);
			close();
		} catch (e) {
			alert('Feilmelding:' + e + '\n' +
			'Prøvde å sende følgende vurdering:' + '\n' +
			'Rating: ' + review.rating + '\n' +
			'Beskrivelse: ' + review.description + '\n' +
			'Vurdert bruker: ' + review.reviewedUser + '\n' +
			'Vurdert annonse: ' + review.reviewedPost + '\n' +
			'Vurdert av: ' + review.reviewer);
		}
	}

	return (

        <div className="root">
            <Modal opened={opened} onClose={close} withCloseButton={false} centered>
                <Title order={3} weight={100} align="center">{getReviewTitle()}</Title>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Group position='center'>
	 						{/* {getReviewTitle()} */}
	 						<Rating defaultValue={2} size="lg" value={rating} onChange={setRating} />
 						</Group>
                    </div>
                    <Textarea
                        maxlength="256"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder=""
                        autosize
                        minRows={2}
                    />
                    <Space h="xs" />
                    <div>
                        <Group position="center" spacing="xs" grow>
                            <Button type="submit" color="green" radius="lg">
                                Send
                            </Button>
                            <Button type="abort" color="red" radius="lg" onClick={(e) => { e.preventDefault(); close(); }}>
                                {' '}
                                Avbryt
                            </Button>
                        </Group>
                    </div>
                </form>
            </Modal>

            <Group position="center">
                    <ActionIcon color="blue" size={31} variant="outline" onClick={open} radius="xl">
                        <Text fw={750} fz={22} align="center"> : ) </Text>
                    </ActionIcon>
            </Group>
        </div>
	);
}
