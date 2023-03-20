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
import { ActionIcon, Button, Card, Flex } from '@mantine/core';
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
		<div style={{backgroundColor: '', display: 'flex', justifyContent: 'center'}}>
            
            <Card style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}> 


            <Space h={15}></Space>
    
            <Flex style={{backgroundColor: 'rgba(0, 0, 0, 0)', display: 'flex', justifyContent: 'center'}}>
                    <div >
                        <Card style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}> 
                                
                        <div className="profileinfo2">
                            <Space h={20}></Space>
                            <div >
                                {user.avatar !== '' 
                                    && <Avatar color="teal" size={300} radius={300} src={user.avatar}></Avatar>
                                }
                                {!(user.avatar !== '')
                                    && <Avatar color="teal" size={300} radius={300}> {user.firstName[0]}{user.lastName[0]}</Avatar>
                                }
                                {!(user.id === activeUser.id) && 
                                    <div style={{ position: "absolute", top: "10px", left: "10px" }}>
                                            <ReportPopUp reporter={getActiveUser()} reportedUser={user} reportedPost={undefined} />
                                    </div>
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
                            </div>
                        </Group>
                        <Space h={7} />

                        <div className="profilecontact">
                            <Button compact color='teal' >
                                <Text>
                                    Telefon
                                </Text>
                            </Button>
                            <Button compact color='teal' >
                                <Text>
                                    E-post
                                </Text>
                            </Button>
                        </div>
                                </Card>
                        <div className="favourite">
                            <ReviewsPopUp user={user}/>
                            {/* {user.id} */}
                        </div>
                    </div>
                {/* </Grid.Col> */}
                <Space w={30} />
                {/* <Grid.Col span={9}> */}
                    <div style={{ textAlign: "center", justifyContent: "center", backgroundColor: ''}} >
                        {(user.id === activeUser.id) &&
                            <div>
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
                                {!show && <Annonsecontainer data={posts} occupiedWidth={2000}></Annonsecontainer>}
                                {show && <Annonsecontainer data={favourites} occupiedWidth={2000}></Annonsecontainer>}
                            </div>
                        }
                        {!(user.id === activeUser.id) && 
                            <div >
                                <Annonsecontainer data={posts} occupiedWidth={2000}></Annonsecontainer>
                            </div>
                        }
                    </div>
                {/* </Grid.Col> */}
                {/* </Flex> */}
            </Flex>
            </Card>
        </div>
                    
                    
        );
    }
            