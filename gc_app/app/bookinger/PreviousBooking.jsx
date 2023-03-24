'use client'
import { Card, Text, Image, Title, Divider, Flex, Grid, Group, Select, Space, CardSection } from "@mantine/core";
import Link from "next/link";
import './booking.css'
import { useState, useEffect } from 'react';
import BookingsView from './BookingsView';



export default function PreviousBooking(props){
    const user = props.user;
    const bookingsOwner = props.data.filter((post)=>post.owner == user.id);
    const bookingsBooker = props.data.filter((post)=>post.booker == user.id);
    console.log(user);

	const [show, setShow] = useState('1');


    return (
        <div style={{ backgroundColor: '', display: 'flex', justifyContent: 'center' }}>
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
                }}>
                <CardSection style={{ display: 'flex', justifyContent: 'center' }}>
                    
                <Title>Aksepterte bookinger</Title>

                </CardSection>
                <Space h={25}></Space>
                <Flex mih={50}
                    gap="xs"
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="wrap"
                    color="green"
                    style={{
                        backgroundColor: 'rgb(0,0,0,0)',
                    }}>

                    <div>
                        <Group position="center">
                            <Select
                                // labelPosition="left"
                                defaultValue="1"
                                // color="gray"
                                miw={125}

                                radius="md"
                                data={[
                                    { value: '1', label: 'Fra sendte forespørsler' },
                                    { value: '2', label: 'Fra motatte forespørsler' }
                                ]}
                                onChange={setShow}
                                styles={(theme) => ({
									input: {
										'&:focus-within': {
											borderColor: theme.colors.teal[7]
										}
									}
								})}
                                />
                        </Group>
                        <Space h="md"></Space>
					    <CardSection style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            {show == '1' && (
                                <div style={{ backgroundColor: ''}}>
                                    
                                    {/* {(bookingsOwner.length == 0) ? (<Title order={2}>Ingen har booket fra deg :(</Title>) : (
                                        <Title order={2}>Annonser andre har booket fra deg:</Title>
                                        )} */}

                                    <BookingsView bookingsOwner={bookingsOwner}></BookingsView>
                                    {/* {bookingsOwner.map((post)=>{
                                        return (
                                            <div>
                                                <Card shadow="sm" padding="lg" radius="md" withBorder maw={200}>
                                                    <Card.Section mah={160}>
                                                        <Image src={post.expand.post.image} height={160} maw={200}/>
                                                    </Card.Section>
                                                    <Card.Section mih={80}>
                                                        <Text>t.
                                                            Eier: <Link href={"../user/" + post.owner}>{post.expand.owner.firstName + " " + post.expand.owner.lastName}</Link>
                                                            <br></br>
                                                            Låner: <Link href={"../user/" + post.booker}>{post.expand.booker.firstName + post.expand.booker.lastName}</Link>
                                                            <br></br>
                                                            Annonse: <Link href={"../mainpost/" + post.post}>{post.expand.post.title}</Link>

                                                        </Text>
                                                    </Card.Section>
                                                </Card>
                                            </div>
                                        )
                                    })} */}
                                </div>
                            )}
                            {show == '2' && (
                                <div>
                                    {/* {(bookingsBooker.length == 0) ? (<Title order={2}>Du har ikke booket noe</Title>) : (   
                                        <Title order={2}>Annonser du har booket tidligere:</Title>
                                        )} */}
                                    <BookingsView bookingsOwner={bookingsBooker}></BookingsView>
{/* 
                                    {bookingsBooker.map((post)=>{
                                        return (
                                            <div>
                                            <Card shadow="sm" padding="lg" radius="md" withBorder maw={200}>
                                                <Card.Section>
                                                    <Image src={post.expand.post.image} mah={200} maw={200}/>
                                                </Card.Section>
                                                    <Text>
                                                        Eier: <Link href={"../user/" + post.owner}>{post.expand.owner.firstName + " " + post.expand.owner.lastName}</Link>
                                                        <br></br>
                                                        Låner: <Link href={"../user/" + post.booker}>{post.expand.booker.firstName + post.expand.booker.lastName}</Link>
                                                        <br></br>
                                                        Annonse: <Link href={"../mainpost/" + post.post}>{post.expand.post.title}</Link>
                                                    </Text>
                                                <Card.Section></Card.Section>
                                            </Card>
                                        </div>
                                        )
                                    })}  */}
                                </div>
                            )}
                        </CardSection>
                    </div>
                </Flex>
            </Card> 
        </div>
    )
}