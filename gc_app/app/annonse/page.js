'use client';
import pb from '../lib/pocketbase';
import Annonsecontainer from './Annonsecontainer';
import Navbar from '../Navbar';
import { useState, useEffect } from 'react';
import { NativeSelect } from '@mantine/core';
import { Button, Grid } from '@mantine/core';

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

	// For ease of implementation, these are static
	const categories = [
		{ value: '', label: 'Alle verktøy' },
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
		{ value: false, label: 'Til Leie' }
	];
	const updatePosts = async (post) => {
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

	// Fetch all posts from database with the given search parameters / filters
	const fetchPosts = async () => {
		try {
			const data = await pb.collection('posts').getList(1, 100, {
				$autoCancel: true,
				expand: 'owner',
				filter: `(title~"${search}" || description~"${search}") && booking_confirmed=false && startDate="" ${category}${isListingFilter}`
			});
			setPostList(data.items);
			posts.filter((post)=>(post.endDate == Date())).forEach((post)=>{
				updatePosts();
			})
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
	}, [search, filter, category, popUp, isListing, isListingFilter]);

	const handlePopOpen = () => {
		setPopUp(true);
	};

	const setPopUpClose = () => {
		setPopUp(false);
	};

	return (
        <div className="bigcontainer">
            <Navbar></Navbar>
            <Grid style={{backgroundColor: '', justifyContent: 'center'}}>
                <div className="onerow">
                    <button className="button" type="button" onClick={handlePopOpen}>
                        Ny Annonse
                    </button>
                    <input
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="searchbar"
                        placeholder="Søk etter motorsag eller skrujern!"
                        />
                    <NativeSelect
                        data={categories}
                        onChange={(event) => setFilter(event.currentTarget.value)}
                        value={filter}
                        radius="md"
                        size="47"
                        ></NativeSelect>
                    <NativeSelect
                        data={isListingTable}
                        onChange={(event) => setListing(event.currentTarget.value)}
                        value={isListing}
                        radius="md"
                        size="47"
                        ></NativeSelect>
                </div>
                <div className="popup">
                    <div className="outercontainer">
                        <div className="reportcontainer">
                            {popUp && <CreatePost setPopUpClose={setPopUpClose} />}
                        </div>
                    </div>
                </div>
                <Annonsecontainer data={posts} />
            </Grid>
        </div>
	);
}
