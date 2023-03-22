'use client';
import React from 'react';
import './review-view.css';
import pb from '../../lib/pocketbase';
import { Rating, Group, Avatar, Text, CardSection } from '@mantine/core';
import Link from 'next/link';
import { Title, Space, Button, UnstyledButton, Card } from '@mantine/core';

/**
 * Displays a review and offers options for deleting related data-elements.
 * 
 * @param {*} reviewData - Data containing review information.
 * @returns - View of a single review.
 */
export default function ReviewView(props) {
    
    const activeUser = getActiveUser();
	let reviewData = props.reviewData;
	let reviewer = props.reviewData.expand.reviewer;
	let reviewedUser = props.reviewData.expand.reviewedUser;
	let reviewedPost = props.reviewData.expand.reviewedPost;
    let reviewDate = new Date(reviewData.created).toISOString().slice(0, 10)

    let isListing = reviewedPost.is_listing;
    let isPostOwner = reviewedPost.owner === reviewer.id;
    let isBorrower = !isPostOwner && reviewedPost.owner === reviewedUser.id;

    function getActiveUser() {
        return pb.authStore.model;
    }      

	async function deleteReview() {
		try {
			if (confirm("Dette vil fjerne vurderingen: " + reviewData.id)) {
				await pb.collection('reviews').delete(reviewData.id);
				alert('Vurdering fjernet: ' + reviewData.id);
				document.location.reload(true);
			}
		} catch (e) {
			alert(e);
		}
	}

	return (
		<div>
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{width: '380px'} }>

			<div>
            <Group position='apart'>
            <Link href={"../user/" + reviewer.id} className="reviewLink">

                <UnstyledButton>
                    <Group position='apart'>
                        {reviewer.avatar !== '' && 
                                <Avatar size={39} src={reviewer.avatar} href={"../user/" + reviewer.id} ></Avatar>
                            }
                        {!(reviewer.avatar !== '') && 
                            <Avatar color="blue" radius="xl"> {reviewer.firstName[0]}{reviewer.lastName[0]}</Avatar>
                        }
                        <div>
                        <Text size={14}>{reviewer.firstName + ' ' + reviewer.lastName}</Text>
                        
                        {/* <div>Reviewer: {reviewedUser.id} </div>
                        <div>Reviewed: {reviewer.id} </div>
                        <div>PostOwner: {reviewedPost.owner} </div>
                        <div>IsListing: {!reviewedPost.is_listing && "False"} {reviewedPost.is_listing && "True"}</div> */}
                        
                        {
                            ( (isListing && isPostOwner) 
                            || (!isListing && isBorrower) ) 
                            && <Text size="xs" color="dimmed">  Låner ({reviewDate})</Text>
                        }

                        {
                            ( (isListing && isBorrower) 
                            || (!isListing && !isBorrower) ) 
                            && <Text size="xs" color="dimmed">  Utlåner ({reviewDate})</Text>
                        }
                        </div>
                    </Group>
                </UnstyledButton>
            </Link>

            <Rating value={reviewData.rating} fractions={2} readOnly size={23}/>
            </Group>



			</div>
            <Space h={4} />
            <CardSection>
                
            </CardSection>
			<div>
            <Link href={"../mainpost/" + reviewedPost.id} className="reviewLink">
                <Title order={5} color="dimmed" >
                    {reviewedPost.title}
                </Title>
            </Link>

            <Text italic size={14}>{reviewData.description}</Text>
                    
			</div>
            {activeUser.id === reviewer.id &&
                <Group position="right">
                    <Button variant="subtle" color="red" compact onClick={deleteReview}>
                        Fjern vurderingen
                    </Button>
                </Group>
            }
            {/* <br /> */}
            </Card>
		</div>
	);
}
