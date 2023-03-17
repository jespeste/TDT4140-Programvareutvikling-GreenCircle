'use client';
import pb from '../../lib/pocketbase';
import ReviewContainer from '../ReviewsView';
import Navbar from '../../Navbar';
import { Switch } from '@mantine/core';
import { useState, useEffect } from 'react';

export default function ReviewPage({ params }) {

    const [reviews, setReviews] = useState([]); 
    const [checked, setChecked] = useState(false);
	const [filter, setFilter] = useState('');

    const fetchReviews= async () => {
        try {
            const reviewsData = await pb.collection('reviews').getList(1,100,{ 
                $autoCancel: true,
                expand: 'reviewer',
                filter: filter
            });
            // console.log(reviewsData);
            setReviews(reviewsData.items);
        } catch (err){
            console.log(err.isAbort);
        }
    }

	useEffect(() => {
        
        if (checked) {
            setFilter(`reviewer="${params.id}"`);
        } else {
            setFilter(`reviewedUser="${params.id}"`);
        }
        
		fetchReviews();
	}, [checked, filter]);


	return (
		<div className="bigcontainer">
			<Navbar />
			<h2 class="headertext"> Vurdering-oversikt</h2>
            {/* ReviewsOf:{params.id}
            Value: {filter} */}

            <Switch
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
                color="green"
                onLabel={'Vurderinger gitt'}
                offLabel={'Vurderinger mottatt'}
                size="xl"
            ></Switch>
			<ReviewContainer reviewsData={reviews} />
		</div>
	);

}


