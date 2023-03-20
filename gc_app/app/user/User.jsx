'use client';
import pb from '../lib/pocketbase';
import './user.css';
import pb from '../lib/pocketbase';
import Annonsecontainer from '../annonse/Annonsecontainer';
import { useState, useEffect } from 'react';
import { Switch, Grid, Group, Flex, Space, Avatar, Text } from '@mantine/core';
import ReportPopUp from '../report/ReportForm';
import ReviewPopUp from '../reviews/review/ReviewForm';
import ReviewsPopUp from '../reviews/ReviewsPopUp';
import { ActionIcon } from '@mantine/core';
import BookingConfirm from '../booking/BookingConfirm';
// import { MessageReport } from 'tabler-icons-react';
              

function getActiveUser() {
	return pb.authStore.model;
}

export default function User(props) {
	const user = props.user;
    const activeUser = getActiveUser();
	let postProp = props.posts.filter((post) => post.owner === user.id);
    const [posts, setPosts] = useState(postProp);
	let favourites = props.posts.filter((post) => user.favourites.includes(post.id));
	const [show, setShow] = useState(false);
    const [isLoading, setloading] = useState(true);
    const [isOn, setOn] = useState(true);

    
	function changeView() {
        setShow(!show);
	}

    async function rejectBooking(id){
		console.log("hei");
        console.log("Called??");
        const upDated = {
            "startDate": "",
            "endDate": "",
            "booking_confirmed": false,
        }
        try {
            let updates = await pb.collection('posts').update(id, upDated);
			console.log(updates);
        } catch (err) {
            console.log(err);
		}
	}
    
    useEffect(()=>{
        if(!isLoading){
            setloading(true);
            async function getPosts() {
                try {
                    const record = await pb.collection('posts').getList(1,100,{
                        filter:`owner="${user.id}"`,
                        expand: 'owner, booker',
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
        console.log(isOn + " Er på? Hei")
    },[isOn])

	return (
		<div>
    
            <Grid style={{backgroundColor: '', justifyContent: 'center'}}>
                {/* <Flex
                    // mih={50}
                    // gap={35}
                    // justify="center"
                    // align="flex-start"
                    // direction="row"
                    // wrap="wrap"
                > */}


                
                {/* <Grid.Col span={2}> */}
                    <div >
                        <div className="profileinfo2">
                            <div >
                                {user.avatar !== '' 
                                    && <Avatar color="teal" size={300} radius={300} src={user.avatar}></Avatar>
                                }
                                {!(user.avatar !== '')
                                    && <Avatar color="teal" size={300} radius={300}> {user.firstName[0]}{user.lastName[0]}</Avatar>
                                }
                                <Space h={15}></Space>
                                {/* <img className="avatar" src={user.avatar}></img> */}
                            </div>
                        </div>

                        <Group position='apart'>
                            <Space w={4}></Space>
                            <div className="name" style={{ textAlign: "center", justifyContent: "center"}}>
                                {user.verified && 
                                    <ActionIcon color="green" size={31} variant="filled" radius="xl">
                                        <Text fw={750} fz={25} align="center"> ✓ </Text>
                                    </ActionIcon>
                                }
                                {/* {user.verified && <div className="verified">&#10003; </div> } */}
                                <Space w={10} />
                                <Text fz={20} align="center"> {user.firstName + ' ' + user.lastName} </Text>
                                {/* {user.firstName + ' ' + user.lastName} */}
                                <Space w={10} />
                                {!(user.id === activeUser.id) && 
                                    <ReportPopUp reporter={getActiveUser()} reportedUser={user} reportedPost={undefined} />
                                }
                                {(user.id === activeUser.id) && (!isLoading) &&
                                    <BookingConfirm data={posts} setOn={setOn} reject={rejectBooking}></BookingConfirm>
                                }
                            </div>
                        </Group>
                        <Space h={7} />

                        <div className="profilecontact">
                            <button className="tlf">Telefon</button>
                            <button className="mail">E-post</button>
                        </div>
                        <div className="favourite">
                            <ReviewsPopUp user={user}/>
                            {/* {user.id} */}
                        </div>
                    </div>
                {/* </Grid.Col> */}
                <Space w="md" />
                {/* <Grid.Col span={9}> */}
                    <div style={{ textAlign: "center", justifyContent: "center"}} >
                        {(user.id === activeUser.id) &&
                            <div >
                                <Group position='center'>

                                    <Switch
                                        labelPosition="left"
                                        // label="Annonser"

                                        onChange={changeView}
                                        color="gray"
                                        // offLabel={'Dine annonser'}
                                        // onLabel={'Favoritt annonser'}
                                        // size={25}
                                        // style={{ width: 250 }} // Set the width to 100 pixels
                                        // radius="md"

                                        // color="gray"
                                        offLabel={<Text fz={18}> Dine annonser </Text>}
                                        onLabel={<Text fz={18}> Favoritt annonser </Text>}
                                        size={32}
                                        radius="md"
                                    ></Switch>
                                    </Group>
                                <Space h="md"></Space>

                                {/* <Switch
                                    onChange={changeView}
                                    color="green"
                                    onLabel={'Favoritter'}
                                    offLabel={'Dine annonser'}
                                    size="xl"
                                ></Switch> */}
                                {!show && <Annonsecontainer data={posts}></Annonsecontainer>}
                                {show && <Annonsecontainer data={favourites}></Annonsecontainer>}
                            </div>
                        }
                        {!(user.id === activeUser.id) &&
                            <div >
                                <Annonsecontainer data={posts}></Annonsecontainer>
                            </div>
                        }
                    </div>
                {/* </Grid.Col> */}
                {/* </Flex> */}
            </Grid>
        </div>
                
                
                );
            }
            