'use client'
import { Card, Text, Image, Title, Divider, Flex, Grid } from "@mantine/core";
import Link from "next/link";
import './booking.css'

export default function PreviousBooking(props){
    const user = props.user;
    const bookingsOwner = props.data.filter((post)=>post.owner == user.id);
    const bookingsBooker = props.data.filter((post)=>post.booker == user.id);
    console.log(user);

    return (
        <>
        <Grid
            justify="center"
            align="center"  
        >   
        <Grid.Col span={7}>
            {(bookingsOwner.length == 0) ? (<Title order={2}>Ingen har booket fra deg :(</Title>) : (
            <Title order={2}>Annonser andre har booket fra deg:</Title>
            )}
        </Grid.Col>
        <Grid.Col span={3}>
            {(bookingsBooker.length == 0) ? (<Title order={2}>Du har ikke booket noe</Title>) : (
                <Title order={2}>Annonser du har booket:</Title>
            )}
        </Grid.Col>
        </Grid>
        <Flex mih={50}
        gap="xs"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
        >
        <div className="left">
        {bookingsOwner.map((post)=>{
            return (
                <div>
                <Card shadow="sm" padding="lg" radius="md" withBorder maw={200}>
                    <Card.Section mah={160}>
                        <Image src={post.expand.post.image} height={160} maw={200}/>
                    </Card.Section>
                    <Card.Section mih={80}>
                        <Text>
                            Eier: <Link href={"../user/" + post.owner}>{post.owner}</Link>
                            <br></br>
                            Låner: <Link href={"../user/" + post.booker}>{post.booker}</Link>
                            <br></br>
                            Annonse: <Link href={"../mainpost/" + post.post}>{post.post}</Link>

                        </Text>
                    </Card.Section>
                </Card>
                </div>
            )
        })
        }
        </div>
        <Divider orientation="vertical" size="md"></Divider>
        <div className="right">
            {/* {(bookingsBooker.length == 0) ? (<Title order={2}>Du har ikke booket noe</Title>) : (
                <Title order={2}>Annonser du har booket:</Title>
            )} */}
            {bookingsBooker.map((post)=>{
                return (
                    <div>
                    <Card shadow="sm" padding="lg" radius="md" withBorder maw={200}>
                        <Card.Section>
                            <Image src={post.expand.post.image} mah={200} maw={200}/>
                        </Card.Section>
                            <Text>
                                Eier: <Link href={"../user/" + post.owner}>{post.owner}</Link>
                                <br></br>
                                Låner: <Link href={"../user/" + post.booker}>{post.booker}</Link>
                                <br></br>
                                Annonse: <Link href={"../mainpost/" + post.post}>{post.post}</Link>

                            </Text>
                        <Card.Section></Card.Section>
                    </Card>
                    </div>
                )
            }
                
            )}  
        </div>
        </Flex>
        </>
    )
}