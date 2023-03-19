'use client';
import pb from '../lib/pocketbase';
import './user.css';
import pb from '../lib/pocketbase';
import Annonsecontainer from '../annonse/Annonsecontainer';
import { useState } from 'react';
import { Switch, Grid, Group, Flex, Space, Avatar, Text } from '@mantine/core';
import ReportPopUp from '../report/ReportForm';
import ReviewPopUp from '../reviews/review/ReviewForm';
import ReviewsPopUp from '../reviews/ReviewsPopUp';
import { ActionIcon } from '@mantine/core';
// import { MessageReport } from 'tabler-icons-react';
              

function getActiveUser() {
	return pb.authStore.model;
}

export default function User(props) {
	const user = props.user;
    const activeUser = getActiveUser();
	let posts = props.posts.filter((post) => post.owner === user.id);
	let favourites = props.posts.filter((post) => user.favourites.includes(post.id));
	const [show, setShow] = useState(false);
	function changeView() {
		setShow(!show);
	}
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
                                {(user.id === activeUser.id) && 
                                    <ActionIcon>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                                        </svg>
                                    </ActionIcon>
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
            