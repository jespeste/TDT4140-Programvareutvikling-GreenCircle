'use client';
import React from 'react';
import './review-view.css';
import pb from '../../lib/pocketbase';
import { Rating, Group, Avatar } from '@mantine/core';

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

    function getActiveUser() {
        return pb.authStore.model;
    }      

	async function deleteReview() {
		try {
			if (confirm("Dette vil fjerne rapporten: " + reviewData.id)) {
				await pb.collection('reviews').delete(reviewData.id);
				alert('Rapport fjernet: ' + reviewData.id);
				document.location.reload(true);
			}
		} catch (e) {
			alert(e);
		}
	}

	return (
		<div className="maincontainer">

			 {<div>
                {activeUser.id === reviewData.reviewer &&
				    <button className="deleteButton" onClick={deleteReview}> X</button>
                }
				<b> Vurdering-ID: </b>{reviewData.id}
			</div>}

			 {<div>
				 <b> Vurdert av: </b>
				 <a href={"../user/" + reviewer.id}>{reviewer.id}</a>
                 <br />
                    <b>Rating: {reviewer.email}</b>
                 <br />
                 {/* <Avatar src={reviewer.avatar} ></Avatar> */}
                 {/* <img src={reviewer.avatar} ></img> */}
                 

			 </div>}

			{reviewData.reviewedUser != '' &&
				<div>
					<b> Vurdert bruker: </b>
					<a href={"../user/" + reviewData.reviewedUser}>{reviewData.reviewedUser}</a>
					<br />
				</div>
			}

			{reviewData.reviewedPost != '' &&
				<div>
					<b> Vurdert annonse: </b>
					<a href={"../mainpost/" + reviewData.reviewedPost}>{reviewData.reviewedPost}</a>
					<br />
				</div>
			}
			
			<br />
			<div>
				<b>Rating: </b>
                <Group position="center">
                    <Rating value={reviewData.rating} fractions={2} readOnly />
                </Group>
			</div>
			<div>
				<b>Beskrivelse: </b>
				{reviewData.description}
			</div>

		</div>
	);
}
