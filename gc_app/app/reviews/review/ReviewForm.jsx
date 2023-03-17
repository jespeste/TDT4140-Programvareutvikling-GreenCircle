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

/**
 * Review button that opens up a form for reviewing inapproptiate users/posts.
 * 
 * @param {*} reviewer - The reviewing user.
 * @param {*} reviewedUser - The reviewed user.
 * @param {*} reviewedPost - The reviewed post.
 * @returns - A button which once clicked opens up a review-form.
 */
export default function ReviewPopUp({reviewer, reviewedUser, reviewedPost}) {
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [description, setDescription] = useState('');
	const [rating, setRating] = useState(2);

    const handleReviewOpen = () => {
        setIsPopUpOpen(true);
    };

    const handleReviewClose = () => {
    setIsPopUpOpen(false);
    };

	const useStyles = createStyles((theme) => ({
		container: {
			backgroundColor: theme.colors.gray[4],
			borderRadius: theme.radius.md,
			padding: 10,
			width: 250,
			justifyContent: 'center',
			textAlign: 'center'
		}
	}))

	const { classes }  = useStyles();

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
		if (isUserReview()) {
			title += reviewedUser.email;
		}
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
			handleReviewClose();
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
        <div className='root'>
            <button onClick={handleReviewOpen}>Vurdér</button>
            <div className="popup" style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000}}>
                { isPopUpOpen &&
                <Container size={300} px={10} className={classes.container}>
                    <form onSubmit={handleSubmit}>
						<div>
							<Group position='center'>
							{getReviewTitle()}
							<Rating defaultValue={2} size="lg" value={rating} onChange={setRating} />
							</Group>
						</div>
                        <Textarea maxlength="256" value={description} onChange={(event) => setDescription(event.target.value)} placeholder=""
                             autosize minRows={2}/>
						<Space h='xs' />
						<div>
							<Group position='center' spacing='xs' grow>
								<Button type="submit" color="green" radius="lg"  >Send</Button>
								<Button type="abort" color="red" radius="lg" onClick={handleReviewClose}> Avbryt</Button>
							</Group>
						</div>
                    </form>
                </Container>
                }
            </div>
        </div>
	);
}
