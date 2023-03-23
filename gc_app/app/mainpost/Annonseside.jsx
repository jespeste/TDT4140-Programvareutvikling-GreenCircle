'use client';
import React from 'react';
import './annonseside.css';
import { useState, useRef } from 'react';
import Loader from '../Loader';
import pb from 'app/lib/pocketbase';
import ReportPopUp from '../report/ReportForm';
import ReviewPopUp from '../reviews/review/ReviewForm';
import Link from 'next/link';
import { Button, Grid, Group, Card, Space,  Avatar, ActionIcon, Text} from '@mantine/core';
import { Container, Grid, Image, Badge, UnstyledButton, CardSection, Button, Modal, ActionIcon } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { DatePicker } from '../booking/datePicker';

export default function Annonseside(props) {
	let data = props.data;
	let owner = props.data.expand.owner;
	let mailstring = 'mailto:' + owner.email;
	let phonestring = 'tel:' + owner.telephone;
	console.log(data.booking_confirmed + " ER den confirmed?");
    const activeUser = getActiveUser();
    const router = useRouter();
	const [location, setLocation] = useState('');
	const [lat, setLat] = useState(null);
	const [long, setLong] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [isBooked, setBooked] = useState(data.booking_confirmed);
	const iframeRef = useRef(null);
	const geolocationAPI = navigator.geolocation;
    const creationDate = new Date(data.created);
    
    const [isFavourite, setIsFavourite] = useState(activeUser.favourites.includes(data.id));
    const [curFavs, setCount] = useState(data.numfavourites);

    function getActiveUser() {
        return pb.authStore.model;
    }

    async function deletePost() {
		try {
			if (confirm("Dette vil fjerne annonsen: " + data.id)) {
				await pb.collection('posts').delete(data.id);
				alert('Annonse fjernet: ' + data.id);
                router.push(`/user/${activeUser.id}`);
			}
		} catch (e) {
			alert(e);
		}
	}
    async function addToFavourites() {
		activeUser.favourites.push(props.data.id);
		const record = await pb.collection('users').update(activeUser.id, activeUser);
        setIsFavourite(activeUser.favourites.includes(data.id));
		setCount(curFavs +1);
		data.numfavourites = data.numfavourites + 1;
		const rec  = await pb.collection('posts').update(data.id, {numfavourites: data.numfavourites});
		console.log('true');


	}
    async function removeFromFavourites() {
		activeUser.favourites.pop(props.data.id);
		const record = await pb.collection('users').update(activeUser.id, activeUser);
        setIsFavourite(activeUser.favourites.includes(data.id));
		setCount(curFavs -1);
		
        data.numfavourites = data.numfavourites -1 
        if (data.numfavourites < 0){
            data.numfavourites = 0;
        }
		const rec  = await pb.collection('posts').update(data.id, {numfavourites: data.numfavourites});
		console.log('false');
	}


	function getCity(coordinates) {
		var xhr = new XMLHttpRequest();
		var lat = coordinates[0];
		var lng = coordinates[1];
		xhr.open(
			'GET',
			'https://us1.locationiq.com/v1/reverse.php?key=pk.3148764d287076753405952377918cf4&lat=' +
				lat +
				'&lon=' +
				lng +
				'&format=json',
			true
		);
		xhr.send();
		xhr.onreadystatechange = processRequest;
		xhr.addEventListener('readystatechange', processRequest, false);

        function processRequest() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                setLocation(response.address);
                return;
            }
        }
	}
	const coordinates = [
		parseFloat(data.location.split(',')[0]),
		parseFloat(data.location.split(',')[1])
	];
	if (location == '') {
		getCity(coordinates);
	}

	const getUserCoordinates = () => {
		if (!geolocationAPI) {
			console.log('Geolocation API is not available in your browser!');
		} else {
			geolocationAPI.getCurrentPosition((position) => {
				const { coords } = position;
				setLat(coords.latitude);
				setLong(coords.longitude);
			});
		}
	};
	getUserCoordinates();

	function iframeLoaded() {
		iframeRef.current.style = { visibility: 'visible' };
		setLoaded(true);
	}

	function goBack() {
		window.history.back();
	}
	console.log(data.category);

	async function handleBooking(dates){
		console.log(dates);
		setBooked(true);
		let user = pb.authStore.model;
		console.log(user.id);
		const upDated = {
			"startDate": dates[0],
			"endDate": dates[1],
			"booking_confirmed": false,
			"booker": user.id,
		}
		try {
			const upDates = await pb.collection('posts').update(data.id, upDated);
			alert("Booking forespørsel har blitt sendt.");
			console.log(upDates);
		} catch (err) {
			alert(err);
		}
	}

	async function handleCancellation(){
		const upDated = {
			"startDate": "",
			"endDate": "",
			"booking_confirmed": false,
			"booker": "",
		}
		try {
			const upDates = await pb.collection('posts').update(data.id, upDated);
			setBooked(false);
			alert("Du har nå avbooket.");
			console.log(upDates);
		} catch (err) {
			alert(err);
		}
	}

	return ( 
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '1150px', backgroundColor: ''}}>
            <Container my="md">
                    <Grid columns={6}>
                    <Grid.Col span={4}>                   
                        <Card shadow="sm" padding="lg" radius="md" withBorder style={{minWidth: '100%'}}>
                            <Card.Section>
                                <Image
                                src={data.image}
                                height={500}
                                alt="AnnonseBilde"
                                />
                                <Button size={18} variant="filled" color="teal" compact onClick={goBack}
                                    style={{ position: "absolute", top: "10px", left: "10px", paddingLeft: '5px', paddingBottom: '2px', paddingTop: '2px', paddingRight: '5px'}}>
                                    {/* // style={{ position: "absolute", top: "10px", left: "10px", width: "50px", height: '33px', justifyContent: 'center', alignContent: 'center'}}> */}
                                    Tilbake 
                                        {/* <Text fz={22} align="center" style={{ paddingBottom: '10px'}}> Tilbake </Text> */}
                                </Button>
                            </Card.Section>
                                            
                                
                            {/* <div style={{ position: "absolute", top: "10px", right: "55px" }}>
                                {!(owner.id === activeUser.id) && data.booking_confirmed && isBooked && data.booker == activeUser.id
                                    && <ReportPopUp reporter={owner} reportedUser={undefined} reportedPost={data} />}
                            </div> */}

                            <Group position="apart" mt="md" mb="xs">
                                
                                <Group>
                                    {data.is_listing && <div> <Badge color="pink" variant="light"> Ønskes lånt </Badge></div>}
                                    {!data.is_listing && <div> <Badge color="teal" variant="light"> Lånes ut </Badge></div>}
                                    {(data.category !== '') && <div> <Badge color="cyan" variant="light"> {data.category}</Badge></div>}
                                </Group>
                                <Group>
                                    <Badge color="pink" variant="light"> {data.numfavourites} har lagt til som favoritt </Badge>
                                    {activeUser.id !== owner.id && <div>


                                    {!isFavourite && 
                                        <ActionIcon 
                                            color="red" 
                                            size={31} 
                                            variant="light" 
                                            onClick={addToFavourites} 
                                            radius="xl"
                                            // style={{ position: "absolute", top: "10px", right: "10px" }}
                                            >
                                            <Text fw={750} fz={25} align="center"> ♡ </Text>
                                        </ActionIcon>
                                    }
                                    {isFavourite &&
                                        <ActionIcon 
                                            color="red" 
                                            size={31} 
                                            variant="light" 
                                            onClick={removeFromFavourites} 
                                            radius="xl"
                                            // style={{ position: "absolute", top: "10px", right: "10px" }}
                                            >
                                            <Text fw={750} fz={25} align="center"> ♥ </Text>
                                        </ActionIcon>
                                    }
                                </div>}
                                {/* Alternative report/review placement: */}
                                {/* <div style={{ position: "absolute", top: "10px", right: "55px" }}> */}
                                    {/* {!(owner.id === activeUser.id) 
                                        && <ReportPopUp reporter={activeUser} reportedUser={undefined} reportedPost={data} />
                                    }
                                    {!(owner.id === activeUser.id) 
                                        && <ReviewPopUp reviewer={activeUser} reviewedUser={owner} reviewedPost={data} />} */}
                            </Group>
                            
                            </Group>
                                <Text weight={500}>{data.title}</Text>

                            <Text size="sm" color="dimmed">
                                {data.description}
                                <br></br>
                                <Space h={15}></Space>
                                <Text>  
                                    <Group position="apart">

                                        Publisert: {creationDate.toISOString().slice(0, 10)} {creationDate.toISOString().slice(11, 19)}
                                        {(activeUser.id === owner.id) &&
                                            <Button variant="subtle" color="red" compact onClick={deletePost}>
                                                Slett annonsen
                                            </Button>
                                        }
						
                                        {!(activeUser.id === owner.id) &&
                                        
                                            <Group>
                                                {!(owner.id === activeUser) && data.booking_confirmed && data.booker == activeUser.id && isBooked
											        && <Button variant="subtle" color="red" compact onClick={()=>{handleCancellation()}}>Avbook</Button>
                                                }
                                                {!(owner.id === activeUser.id) && !data.booking_confirmed && !isBooked
                                                    && <DatePicker handleBooking={handleBooking} avStart={data.availability_start} avEnd={data.availability_end}></DatePicker>
                                                }
                                                {/* Review should only be available for posts that the user has participated in (as borrower/borrowee) .
                                                    For the future: replace 'true' with the additional check that the activeUser has been a 
                                                    borrower/borrowee for the post in question.*/}
                                                {!(owner.id === activeUser.id) && data.booking_confirmed && isBooked && data.booker == activeUser.id &&
                                                    <ReviewPopUp reviewer={activeUser} reviewedUser={owner} reviewedPost={data} />

                                                }
                                                {(activeUser.id !== owner.id) &&
                                                    <ReportPopUp reporter={activeUser} reportedUser={undefined} reportedPost={data} />
                                                }
                                            </Group>
                                        }
                                    </Group>
                                </Text>
                            </Text>
                        </Card></Grid.Col>
                    <Grid.Col span={2}>
                    <div>
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{minwWidth: '380px', justifyContent: 'center', textAlign: 'center'} }>

                <div>
                <Group position='center'>

                    <Link href={"../user/" + owner.id}>

                        <UnstyledButton>
                            <Group position='center'>
                                {owner.avatar !== '' && 
                                        <Avatar size={70} radius='xl' src={owner.avatar} href={"../user/" + owner.id} ></Avatar>
                                    }
                                {!(owner.avatar !== '') && 
                                    <Avatar color="blue" size={70} radius="xl"> {owner.firstName[0]}{owner.lastName[0]}</Avatar>
                                }
                            </Group>
                            {/* <Group position='right'> */}
                                <Text size={14}>{owner.firstName + ' ' + owner.lastName} </Text>                       
                            </UnstyledButton>
                        </Link>
                                {(data.is_listing) 
                                    && 
                                    <div style={{ position: "absolute", top: "10px", left: "10px"}}>
                                        <Badge size="md" color="dimmed">  Låner </Badge>
                                    </div>
                                }
                                {(!data.is_listing) 
                                    &&
                                    <div style={{ position: "absolute", top: "10px", left: "10px"}}>
                                        <Badge size="md" color="teal" >  Utlåner </Badge>
                                    </div>
                                }
                            {/* </Group> */}

                </Group>
                {activeUser.id !== owner.id &&
                    <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                        <ReportPopUp reporter={activeUser} reportedUser={owner} reportedPost={undefined} />
                    </div>
                }
                
                </div>
                <Space h={4} />
                <CardSection>
                    
                </CardSection>
                <div>
                    <Group position="center">
                        <Button color='teal' compact variant="outline" onClick={() => (window.location = phonestring)}>
                            Telefon
                        </Button>
                        <Button color='teal' compact variant="outline" onClick={() => (window.location.href = mailstring)}>
                            E-post 
                        </Button>
                    </Group>
                </div>

                {/* <br /> */}
            </Card>
		    </div>
                <Space h={15}></Space>
                     <Card shadow="sm" padding="lg" radius="md" withBorder style={{width: "300px"}}>
                            <Card.Section>
                            <div height={200} width="100%">
							{!loaded && <Loader />}
							<iframe
								src={
									'https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d9394577.855917023!2d4.244162587814275!3d54.909975819805574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e2!4m4!2s' +
									lat +
									'%2C' +
									long +
									'!3m2!1d' +
									lat +
									'!2d' +
									long +
									'!4m4!2s' +
									coordinates[0] +
									'%2C' +
									coordinates[1] +
									'!3m2!1d' +
									coordinates[0] +
									'!2d' +
									coordinates[1] +
									'!5e0!3m2!1sno!2sno!4v1678047228005!5m2!1sno!2sno'
								}
								height={250}
								width="100%"
								style={{ visibility: 'hidden' }}
								allowfullscreen
								ref={iframeRef}
								onLoad={iframeLoaded}
                                ></iframe>
						</div>
                            </Card.Section>
                        </Card>
                    </Grid.Col>   
                </Grid>
            </Container>

		    <div>
		
            
		</div>
        </div>
	);
}
