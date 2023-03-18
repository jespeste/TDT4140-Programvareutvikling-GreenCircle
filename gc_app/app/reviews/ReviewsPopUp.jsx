'use client';
import pb from '../lib/pocketbase';
import ReviewContainer from './ReviewsView';
import Navbar from '../Navbar';
import { useState, useEffect } from 'react';
import { Switch, Title, Group, Space, Rating, Text} from '@mantine/core';

export default function ReviewsPopUp({ user }) {

    const [reviews, setReviews] = useState([]);
    const [checked, setChecked] = useState(false);
    const [filter, setFilter] = useState('');
    const [avgRating, setAvgRating] = useState(0);

    const fetchReviews = async () => {
        try {
            const reviewsData = await pb.collection('reviews').getList(1,100,{ 
                $autoCancel: true,
                expand: 'reviewer, reviewedPost, reviewedUser',
                filter: filter
            });
            setReviews(reviewsData.items);
        } catch (err){
            console.log(err.isAbort);
        }
    }

    useEffect(() => {
        if (checked) {
            setFilter(`reviewer="${user.id}"`);
        } else {
            setFilter(`reviewedUser="${user.id}"`);
        }
        fetchReviews();
    }, [checked, filter]);

    useEffect(() => {
        const sumRatings = reviews.reduce((total, review) => total + review.rating, 0);
        const avgRating = reviews.length > 0 ? sumRatings / reviews.length : 0;
        setAvgRating(avgRating);
    }, [reviews]);

    return (
        <div style={{ width: 370, backgroundColor: ''}}>
            <Group position='apart'>
                <Switch
                    labelPosition="left"
                    checked={checked}
                    onChange={(event) => setChecked(event.currentTarget.checked)}
                    color="gray"
                    onLabel={<Text fz={14}> Vurderinger gitt </Text>}
                    offLabel={<Text fz={14}> Vurderinger fått </Text>}
                    size={25}
                    radius="md"
                ></Switch>
                <Space h={44} w={0}></Space>
                {!checked && <Rating value={avgRating} fractions={2} readOnly size={26}/>}
                {checked && <Space h={44}></Space>}
            </Group>
            <Space h="md"></Space>
			<ReviewContainer reviewsData={reviews} />
		</div>
	);

}


