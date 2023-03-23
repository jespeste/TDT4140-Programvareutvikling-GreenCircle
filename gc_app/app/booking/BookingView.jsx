'use client';
import React from 'react';
import Link from 'next/link';
import pb from '../lib/pocketbase';
import { useState } from 'react';
import { Tooltip, Text, Title, Space, Button, UnstyledButton, Card, Action, Table, Image, Group, Badge } from '@mantine/core';
import ReviewPopUp from '../reviews/review/ReviewForm';
import ReportPopUp from '../report/ReportForm';

export default function BookingView({post}) {
    const activeUser = getActiveUser();
    
    function getActiveUser() {
        return pb.authStore.model;
    }

    return (
        <div>
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ width: '320px', height: '450px' }}
            >
                <Card.Section>
                    <Link href={`/mainpost/${post.expand.post.id}`}>
                        <Image src={post.expand.post.image} height={250} alt="AnnonseBilde" />
                    </Link>
                </Card.Section>
                {/* <Card.Section mah={160}>
                    <Image src={post.expand.post.image} height={160} maw={200}/>
                </Card.Section> */}
                <Card.Section mih={80}>
                    <Text style={{marginLeft: '10px', marginTop: '7px'}}>
                        
                        <Link href={"../mainpost/" + post.post}> 
                            <Title order={5} color="dimmed" >
                                {post.expand.post.title}
                            </Title>
                                
                        </Link>
                        <br></br>
                        <div style={{marginLeft: ''}}>

                        <Text >
                         Annonsert av: <Link href={"../user/" + post.owner}>{post.expand.owner.firstName + " " + post.expand.owner.lastName}</Link>
                        <br></br>
                        <Space h={10}></Space>
                         Kontaktet av: <Link href={"../user/" + post.booker}>{post.expand.booker.firstName + post.expand.booker.lastName}</Link>
                        </Text>
                        </div>
                        
                        {(activeUser.id !== post.booker.id) &&
                        <div>
                            {(!post.expand.post.is_listing) 
                                        &&
                                        <div style={{ position: "absolute", top: "255px", right: "10px"}}>
                                            <Badge size="md" color="teal" >  Du låner ut </Badge>
                                        </div>
                                    }
                            {(post.expand.post.is_listing) 
                                && 
                                <div style={{ position: "absolute", top: "255px", right: "10px"}}>
                                    <Badge size="md" color="dimmed">  Du låner </Badge>
                                </div>
                            }
                            </div>
                         }
                        {(!(post.expand.owner.id === activeUser.id) && post.expand.post.booker == activeUser.id) &&
                            <Group apart>
                                <div style={{ position: "absolute", bottom: "10px", left: "10px"}}>

                                <ReviewPopUp reviewer={activeUser} reviewedUser={post.expand.owner} reviewedPost={post.expand.post} />
                                </div>
                                <div style={{ position: "absolute", bottom: "10px", right: "10px"}}>

                                <ReportPopUp reporter={activeUser} reportedUser={post.expand.owner} reportedPost={undefined} />
                                </div> 
                            </Group>
                        }
                        {((post.expand.owner.id === activeUser.id) && post.expand.post.booker != activeUser.id) &&
                            <Group apart>
                                <div style={{ position: "absolute", bottom: "10px", left: "10px"}}>
                                <ReviewPopUp reviewer={activeUser} reviewedUser={post.expand.booker} reviewedPost={post.expand.post} />
                                </div>
                                <div style={{ position: "absolute", bottom: "10px", right: "10px"}}>
                                <ReportPopUp reporter={activeUser} reportedUser={post.expand.booker} reportedPost={undefined} />
                                </div> 

                            </Group>
                        }
                    </Text>
                </Card.Section>
            </Card>
        </div>
    )
}