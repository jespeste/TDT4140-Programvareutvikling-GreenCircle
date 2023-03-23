'use client';
import pb from '../lib/pocketbase';
import Annonsecontainer from './Annonsecontainer';
import Navbar from '../Navbar';
import { useState, useEffect } from 'react';
import { CardSection, NativeSelect } from '@mantine/core';
import { Button, Grid, Input, Group, Card, Space, Select, Flex} from '@mantine/core';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addDays } from 'date-fns';

import './main.css';
import CreatePost from './createpost';

export default function Annonsepage() {
	const [posts, setPostList] = useState([]);
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('');
	const [category, setCategory] = useState('');
	const [popUp, setPopUp] = useState(false);
	const [isListingFilter, setListingFilter] = useState('');
	const [isListing, setListing] = useState('');
	const [useDates, setUseDates] = useState(false);
	const [switc, setSwitch] = useState(false);

	// Daterange
	const [opened, { open, close }] = useDisclosure(false);
	const [state, setState] = useState([
        {
        startDate: new Date(), 
        //Default selected start date is today
        endDate: addDays(new Date(), 4), 
        //Default selected end date is four days from today
        key: 'selection',
        color: '#17C964',
        },
    ]);

	// For ease of implementation, these are static
	const categories = [
		{ value: '', label: 'Alle' },
		{ value: 'Småelektrisk', label: 'Småelektrisk' },
		{ value: 'Håndverktøy', label: 'Håndverktøy' },
		{ value: 'Spikerpistol og kompressor', label: 'Spikerpistol og kompressor' },
		{ value: 'Storelektrisk', label: 'Storelektrisk' },
		{ value: 'Måleverktøy', label: 'Måleverktøy' },
		{ value: 'Lim og festemidler', label: 'Lim og festemidler' },
		{ value: 'Maling', label: 'Maling' },
		{ value: 'Verktøyoppbevaring', label: 'Verktøyoppbevaring' }
	];
	const isListingTable = [
		{ value: '', label: 'Alle' },
		{ value: true, label: 'Ønskes Lånt' },
		{ value: false, label: 'Lånes ut' }
	];
	const updatePosts = async (post) => {
		console.log("RUns");
		try {
			let unbooked = {
				"startDate": "",
				"endDate": "",
				"booking_confirmed": false
			}
			const update = await pb.collection('posts').update(post.id, unbooked);
		} catch (err) {
			console.log(err);
		}
	}
	const getAndUpdate = async () => {
		const record2 = await pb.collection('posts').getList(1, 100, {
			$autoCancel: true,
			expand: 'owner',
		});
		record2.items.filter((post)=>{
			const end = new Date(post.endDate);
			const today = new Date();
			return end > today;
		}).forEach((post)=>{
			updatePosts(post);
		})
	}

	// Fetch all posts from database with the given search parameters / filters
	const fetchPosts = async () => {
		try {
			const data = await pb.collection('posts').getList(1, 100, {
				$autoCancel: true,
				expand: 'owner',
				filter: `(title~"${search}" || description~"${search}") ${category}${isListingFilter}`
                // code below was added for testing deletion on the posts-overview page.
				// filter: `(title~"${search}" || description~"${search}")`
			});
			if(useDates){
				setPostList(data.items.filter((post)=>{
					let start = new Date(post.availability_start);
					let end = new Date(post.availability_end);
					console.log(start);
					console.log(end);
					return (start <= state[0].startDate && end >= state[0].endDate);
				}));
			} else {
				setPostList(data.items);
			}
			// TODO: Find how to update posts when they pass a certain date, maybe backend or something.
			//getAndUpdate();
		} catch (err) {
			console.log(err.isAbort);
		}
	};

	// Update the post overview when any filters are applied or if a new post is created
	useEffect(() => {
		if (filter !== '') {
			setCategory(`&& category="${filter}"`);
		} else {
			setCategory('');
		}
		if (isListing !== '') {
			setListingFilter(`&& is_listing=${isListing}`);
		} else {
			setListingFilter('');
		}
		fetchPosts();
	}, [search, filter, category, popUp, isListing, isListingFilter, useDates, switc]);

	const handlePopOpen = () => {
		setPopUp(true);
	};

	const setPopUpClose = () => {
		setPopUp(false);
	};

	const filterDates = (input) => {
		setUseDates(input);
		setSwitch(!switc);
		close();
	}

	return (
		<div>
			<Navbar page="posts"></Navbar>

			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Card
					shadow="sm"
					padding="lg"
					radius="md"
					withBorder
					style={{
						backgroundColor: 'rgb(0,0,0,0)',
						width: '80vw',
						maxWidth: '1150px',
						paddingTop: '30px',
						paddingBottom: '25px',
						marginTop: '10px',
						minHeight: '90vh',
						marginBottom: '25px',
						paddingBottom: '40px'
					}}
				>
					<CardSection style={{ display: 'flex', justifyContent: 'center' }}>
						<Group position="center">
							<Button
								miw={130}
                                radius="md"

								variant="outline"
								color="teal"
								onClick={handlePopOpen}
								style={{ marginTop: '25px' }}
							>
								+ Ny Annonse
							</Button>

							<Input.Wrapper label="Søk">
								<Input
									value={search}
								    radius="md"

									onChange={(event) => setSearch(event.target.value)}
									placeholder="Søk etter utstyr her"
									styles={(theme) => ({
										input: {
											'&:focus-within': {
												borderColor: theme.colors.teal[7]
											}
										}
									})}
								/>
							</Input.Wrapper>
							<Select
								label="Kategorier"
                                maw={125}
								data={categories}
								onChange={setFilter}
								value={filter}
								radius="md"
								// size="47"
								styles={(theme) => ({
									input: {
										'&:focus-within': {
											borderColor: theme.colors.teal[7]
										}
									}
								})}
							></Select>
							<Select
                                maw={125}

								label="Annonsetype"
								data={isListingTable}
								onChange={setListing}
								value={isListing}
								radius="md"
								// size="47"
								styles={(theme) => ({
									input: {
										'&:focus-within': {
											borderColor: theme.colors.teal[7]
										}
									}
								})}
							></Select>
							<Button 
								variant="outline"
								color="teal"
                                radius="md"

                                miw={130}
								style={{ marginTop: '25px' }}
								onClick={open}>Tidsperiode</Button>
							<Modal opened={opened} onClose={close} title="Tidsperiode">
								<Group style={{justifyContent: 'center'}}>
								<DateRange
									minDate={new Date()} 
									// Cannot select date before today.
									editableDateInputs={true}
									moveRangeOnFirstSelection={false}
									ranges={state}
									onChange={(item) => {
									setState([item.selection]);
									}}
								/>
									<Button 
                                    miw={90}
									color="teal"
									style={{ marginTop: '25px' }} 
									onClick={()=>(filterDates(1))}>Sett tidsperiode</Button>
									<Button 
                                    miw={90}
									color="red"
									style={{ marginTop: '25px' }} 
									onClick={()=>(filterDates(0))}>Fjern filter</Button>
								</Group>
							</Modal>
						</Group>
					</CardSection>
					<Space h={25}></Space>
					<CardSection style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Annonsecontainer data={posts} occupiedWidth={1500} showDelete={false} fetchPosts={fetchPosts}/>
						{/* <Annonsecontainer data={posts} occupiedWidth={1500} showDelete={true} fetchPosts={fetchPosts}/> */}
					</CardSection>
				</Card>
				<div className="popup">
					<div className="outercontainer">
						<div className="reportcontainer">
							{popUp && <CreatePost setPopUpClose={setPopUpClose} />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
