'use client';
import React from 'react';
import Link from 'next/link';
import './annonse.css';
import { Card, Image, Text, Badge, Button, Group, Avatar, ActionIcon } from '@mantine/core';
import ReportPopUp from '../report/ReportForm';
import { useState } from 'react';
import pb from '../lib/pocketbase';

export default function Annonse(props) {
	const PHONEICON =
		'http://127.0.0.1:8090/api/files/0ntieiylnsgmw2q/le6f34par706jch/phone_jGAryoagIa.png';
	const activeUser = getActiveUser();
	let data = props.data;
	let owner = props.data.expand.owner;
	let showDelete = props.showDelete;

	const [isFavourite, setIsFavourite] = useState(activeUser.favourites.includes(data.id));
	const [postExists, setPostExists] = useState(true);

	// let phonestring = 'tel:' + owner.telephone;
	// let messagestring = 'sms:' + owner.telephone;

	function getActiveUser() {
		const activeUser = pb.authStore.model;
		return activeUser;
	}

	async function addToFavourites() {
		activeUser.favourites.push(props.data.id);
		const record = await pb.collection('users').update(activeUser.id, activeUser);
		setIsFavourite(activeUser.favourites.includes(data.id));
	}
	async function removeFromFavourites() {
		activeUser.favourites.pop(props.data.id);
		const record = await pb.collection('users').update(activeUser.id, activeUser);
		setIsFavourite(activeUser.favourites.includes(data.id));
	}
	async function deletePost() {
		try {
			if (confirm('Dette vil fjerne annonsen: ' + data.id)) {
				await pb.collection('posts').delete(data.id);
				alert('Annonse fjernet: ' + data.id);
				// document.location.reload();
				setPostExists(false);
			}
		} catch (e) {
			alert(e);
		}
	}

	return (
		<>
			{postExists && (
				<div>
					<Card
						shadow="sm"
						padding="lg"
						radius="md"
						withBorder
						style={{ width: '320px', height: '450px' }}
					>
						<Card.Section>
							<Link href={`/mainpost/${data.id}`}>
								<Image src={data.image} height={250} alt="AnnonseBilde" />
							</Link>
						</Card.Section>
						{activeUser.id !== owner.id && (
							<div>
								{/* {!activeUser.favourites.includes(data.id) && */}
								{!isFavourite && (
									<ActionIcon
										color="red"
										size={35}
										variant="light"
										onClick={addToFavourites}
										radius="xl"
										style={{ position: 'absolute', top: '10px', right: '10px' }}
									>
										<Text fw={750} fz={33} align="center">
											{' '}
											♡{' '}
										</Text>
									</ActionIcon>
								)}
								{isFavourite && (
									<ActionIcon
										color="red"
										size={35}
										variant="light"
										onClick={removeFromFavourites}
										radius="xl"
										style={{ position: 'absolute', top: '10px', right: '10px' }}
									>
										<Text fw={750} fz={33} align="center">
											{' '}
											♥{' '}
										</Text>
									</ActionIcon>
								)}
							</div>
						)}
						{activeUser.id === owner.id && showDelete && (
							<ActionIcon
								color="red"
								size={35}
								variant="light"
								onClick={deletePost}
								radius="xl"
								style={{ position: 'absolute', top: '10px', right: '10px' }}
							>
								<Text fw={750} fz={27} align="center">
									{' '}
									🞭{' '}
								</Text>
							</ActionIcon>
						)}
						<Group position="apart" mt="md" mb="xs">
							<Text weight={500}>{data.title}</Text>
							{data.is_listing && (
								<div>
									<Badge color="pink" variant="light">
										Ønskes lånt
									</Badge>
								</div>
							)}
							{!data.is_listing && (
								<div>
									<Badge color="teal" variant="light">
										Lånes ut
									</Badge>
								</div>
							)}
						</Group>

						<Text size="sm" color="dimmed" style={{ height: '70px', overflow: 'scrollable' }}>
							{data.description}
						</Text>

						<Group position="apart" mt="md" mb="xs" grow>
							<Link href={`/mainpost/${data.id}`} style={{ textDecoration: 'none' }}>
								<Button variant="light" color="teal" fullWidth mt="md" radius="md">
									Se mer
								</Button>
							</Link>
						</Group>
					</Card>
				</div>
			)}
		</>
	);
}
