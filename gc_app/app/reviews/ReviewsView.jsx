import React from 'react';
import ReviewView from './review/ReviewView';
import './reviews-view.css';

export default function ReviewContainer(props) {
	return (
		<div className="outercontainer">
			<div className="reviewcontainer">
				{props.reviewsData.map((review) => {
					return <ReviewView 
                        reviewData={review}  
                         />;
				})}
			</div>
		</div>
	);
}
