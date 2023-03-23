'use client';
import pb from '../lib/pocketbase';
import './user.css';
import pb from '../lib/pocketbase';
import Annonsecontainer from '../annonse/Annonsecontainer';
import { useState, useEffect } from 'react';
import { Switch, Grid, Group, Flex, Space, Avatar, Text, Button, Select } from '@mantine/core';
import ReportPopUp from '../report/ReportForm';
import ReviewPopUp from '../reviews/review/ReviewForm';
import ReviewsPopUp from '../reviews/ReviewsPopUp';
import { ActionIcon, Button, Card, Flex } from '@mantine/core';
import BookingConfirm from '../booking/BookingConfirm';
// import { MessageReport } from 'tabler-icons-react';

function getActiveUser() {
	return pb.authStore.model;
}

export default function User(props) {
	const user = props.user;
	const activeUser = getActiveUser();
    const [posts, setPosts] = useState([]);
	// let postProp = props.posts.filter((post) => post.owner === user.id);
	// const [posts, setPosts] = useState(postProp);
	// const booked = props.posts.filter((post) => {
	// 	if (post.booker != '' && post.booking_confirmed) {
	// 		return post.expand.booker.id == user.id;
	// 	}
	// });
	// let favourites = posts.filter((post) => user.favourites.includes(post.id));
	let mailstring = 'mailto:' + user.email;
	let phonestring = 'tel:' + user.telephone;

	const [show, setShow] = useState('1');
	const [isLoading, setloading] = useState(true);
	const [isOn, setOn] = useState(true);
	const [bookRequest, setCurrentPosts] = useState([]);
	const [showBooked, setShowBooked] = useState(false);

	function changeView() {
		setShow(!show);
	}

    // Fetch all posts from database with the given search parameters / filters
	const fetchPosts = async () => {
		try {
			const data = await pb.collection('posts').getList(1, 100, {
				$autoCancel: true,
				expand: 'owner, booker'
			});
			setPosts(data.items);

			// TODO: Find how to update posts when they pass a certain date, maybe backend or something.
			//getAndUpdate();
		} catch (err) {
			console.log(err.isAbort);
		}
	};

    // Update the post overview when any filters are applied or if a new post is created
	useEffect(() => {
		fetchPosts();
	}, []);

	async function rejectBooking(id) {
		console.log('hei');
		console.log('Called??');
		const upDated = {
			startDate: '',
			endDate: '',
			booking_confirmed: false
		};
		try {
			let updates = await pb.collection('posts').update(id, upDated);
			console.log(updates);
		} catch (err) {
			console.log(err);
		}
	}

	async function acceptBooking(id) {
		const upDated = {
			booking_confirmed: true
		};
		const post = await pb.collection('posts').getOne(id);
		const upBook = {
			owner: post.owner,
			booker: post.booker,
			post: post.id,
			startDate: post.startDate,
			endDate: post.endDate
		};
		try {
			let updates = await pb.collection('posts').update(id, upDated);
			console.log(updates);
			let upBookes = await pb.collection('bookings').create(upBook);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		if (!isLoading) {
			setloading(true);
			async function getPosts() {
				try {
					const record = await pb.collection('posts').getList(1, 100, {
						// filter:`owner="${user.id}"`,
						expand: 'owner, booker'
					});
					console.log(record);
					setPosts(record.items);
				} catch (err) {
					alert(err);
				}
			}
			getPosts();
			console.log(posts);
			setloading(false);
		}
		setloading(false);
		console.log(isOn + ' Er på? Hei');
	}, [isOn, show]);

	return (
		<div style={{ backgroundColor: '', display: 'flex', justifyContent: 'center' }}>
			<Card style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
				<Space h={15}></Space>

				<Flex
					style={{ backgroundColor: 'rgba(0, 0, 0, 0)', display: 'flex', justifyContent: 'center' }}
				>
					<div>
						<Card style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
							<div className="profileinfo2">
								<Space h={20}></Space>
								<div>
									{user.avatar !== '' && (
										<Avatar color="teal" size={300} radius={300} src={user.avatar}></Avatar>
									)}
									{!(user.avatar !== '') && (
										<Avatar color="teal" size={300} radius={300}>
											{' '}
											{user.firstName[0]}
											{user.lastName[0]}
										</Avatar>
									)}
									{!(user.id === activeUser.id) && (
										<div style={{ position: 'absolute', top: '10px', left: '10px' }}>
											<ReportPopUp
												reporter={getActiveUser()}
												reportedUser={user}
												reportedPost={undefined}
											/>
										</div>
									)}
									<Space h={15}></Space>
									{/* <img className="avatar" src={user.avatar}></img> */}
								</div>
							</div>

							<Group position="apart">
								<Space w={4}></Space>
								<div className="name" style={{ textAlign: 'center', justifyContent: 'center' }}>
									{user.verified && (
										<ActionIcon color="green" size={31} variant="filled" radius="xl">
											<Text fw={750} fz={25} align="center">
												{' '}
												✓{' '}
											</Text>
										</ActionIcon>
									)}
									{/* {user.verified && <div className="verified">&#10003; </div> } */}
									<Space w={10} />
									<Text fz={20} align="center">
										{' '}
										{user.firstName + ' ' + user.lastName}{' '}
									</Text>
									{/* {user.firstName + ' ' + user.lastName} */}
                                        {(user.id === activeUser.id) && (!isLoading) &&
                                            <BookingConfirm 
                                                data={posts.filter((post)=>(post.owner == user.id))} 
                                                setOn={setOn} 
                                                reject={rejectBooking} 
                                                accept={acceptBooking}>
                                            </BookingConfirm>
                                        }
									<Space w={10} />
								</div>
							</Group>
							<Space h={7} />

							<div className="profilecontact">
								{/* <Group position="center"> */}
								<Button
									color="teal"
									compact
									variant=""
									onClick={() => (window.location = phonestring)}
								>
									Telefon
								</Button>
								<Button
									color="teal"
									compact
									variant=""
									onClick={() => (window.location.href = mailstring)}
								>
									E-post
								</Button>
								{/* </Group> */}
							</div>
						</Card>
						<div className="favourite">
							<ReviewsPopUp user={user} />
							{/* {user.id} */}
						</div>
					</div>
					{/* </Grid.Col> */}
					<Space w={30} />
					{/* <Grid.Col span={9}> */}
					<div style={{ justifyContent: 'center', backgroundColor: '', maxWidth: '1000px' }}>
						{user.id === activeUser.id && (
							<div>
								<Group position="center">
									<Select
										labelPosition="left"
										defaultValue="1"
										color="gray"
										data={[
											{ value: '1', label: 'Mine annonser' },
											{ value: '2', label: 'Favoritter' },
											{ value: '3', label: 'Mine bookinger' }
										]}
										onChange={setShow}
									/>
								</Group>
								<Space h="md"></Space>
								{show == '1' && (
									<Annonsecontainer
										showDelete={true}
										occupiedWidth={2000}
                                        fetchPosts = {fetchPosts}
										data={posts.filter((post) => post.owner == user.id)}
									></Annonsecontainer>
								)}
								{show == '2' && (
									<Annonsecontainer
										occupiedWidth={2000}
                                        fetchPosts = {fetchPosts}
										data={posts.filter((post) => user.favourites.includes(post.id))}
									></Annonsecontainer>
								)}
								{show == '3' && (
									<Annonsecontainer
										occupiedWidth={2000}
                                        fetchPosts = {fetchPosts}
										data={posts.filter((post) => {
											if (post.booker != '' && post.booking_confirmed) {
												return post.expand.booker.id == user.id;
											}
										})}
									></Annonsecontainer>
								)}
							</div>
						)}
						{!(user.id === activeUser.id) && (
							<div>
								<Annonsecontainer 
                                    data={posts.filter((post) => post.owner == user.id)} 
                                    occupiedWidth={2000}
                                    fetchPosts = {fetchPosts}>
                                    
                                </Annonsecontainer>
							</div>
						)}
					</div>
					{/* </Grid.Col> */}
					{/* </Flex> */}
				</Flex>
			</Card>
		</div>
	);
}
