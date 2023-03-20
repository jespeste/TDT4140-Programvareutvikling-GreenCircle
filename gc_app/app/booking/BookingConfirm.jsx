'use client'
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from "react";
import { Group, Button, TextInput, Dialog, Text, ActionIcon } from "@mantine/core";
import pb from '../lib/pocketbase';

export default function BookingConfirm(props){
    const [opened, { toggle, close }] = useDisclosure(false);
    const [bellClicked, setClicked] = useState(false);
    const data = props.data;
    console.log(data);
    // const [isLoading, setloading] = useState(true);
    const [opposite, setOpposite] = useState(false);


    async function acceptBooking(id){
        props.accept(id);
        props.setOn(opposite);
        setOpposite(!opposite);
        close();
    }

    function handleClick(){
        props.setOn(opposite);
        setOpposite(!opposite);
        setClicked(true);
        toggle();
    }

    async function rejectBooking(id){
        props.reject(id);
        props.setOn(opposite);
        setOpposite(!opposite);
        close();
    }

    // async function getPosts() {
    //     let user = pb.authStore.model;
    //     try {
    //         const record = await pb.collection('posts').getList(1,100,{
    //             filter:`owner="${user.id}"`,
    //             expand: 'booker',
    //         });
    //         console.log(record);
    //         return record.items;
    //     } catch (err) {
    //         alert(err);
    //     }
    // }
    
    // useEffect(()=>{
    //     if(!isLoading){
    //         let updated = getPosts();
    //         setData(updated);
    //         console.log(data);
    //     }
    //     setloading(false);
    // },[toggle])

    return (
        <>
            <Group position="center">
                <ActionIcon onClick={handleClick} style={{outlineColor: "black"}}>
                    {!((data.filter((post)=>post.startDate == '').length == 0)) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                    </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell-ringing" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                            <path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727" />
                            <path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727" />
                        </svg>
                    )
                    }
                </ActionIcon>
            </Group>

            <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
                <Text size="lg" mb="xs" weight={500}>
                    Forespørsler om bookinger
                </Text>
                {(data.length == 0) ? (<h2>Ingen nye booking forespørsler :) </h2>) : (
                <>
                {data.filter(post=>post.startDate!='' && post.booking_confirmed == false).map((post) => {
                    return (<>
                        <Text size='sm' mb='xs' key={post.id}>
                            Hvem: {post.expand.booker.firstName} {post.expand.booker.lastName}
                            <br/>
                            Annonse: {post.title}
                            <br/>
                            Fra {post.startDate.slice(0,10)} til {post.endDate.slice(0,10)}
                            <br/>
                            <a href={"../mainpost/" + post.id}>{"Placeholder2"}</a>

                        </Text>
                        <Group align="flex-end">
                            <Button onClick={()=>acceptBooking(post.id)}>Aksepter booking</Button>
                            <Button onClick={()=>rejectBooking(post.id)} style={{backgroundColor: "red"}}>Avslå</Button>
                        </Group>
                        </>
                        )
                    })
                }
                </>)
            }
            </Dialog>
        </>
    )
}