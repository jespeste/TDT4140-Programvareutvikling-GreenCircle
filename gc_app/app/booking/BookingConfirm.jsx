'use client'
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from "react";
import { Group, Button, TextInput, Dialog, Text} from "@mantine/core";
import pb from '../lib/pocketbase';

export default function BookingConfirm(props){
    const [opened, { toggle, close }] = useDisclosure(false);
    const [data, setData] = useState(props.data);


    async function acceptBooking(){
        close();
    }
    
    useEffect(()=>{
        setData(props.data);    
    },[data])

    return (
        <>
            <Group position="center">
                <Button onClick={toggle}>Booking forespørsler</Button>
            </Group>

            <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
                <Text size="lg" mb="xs" weight={500}>
                    Forespørsler om bookinger
                </Text>
                {data.map((post) => {
                    return (<>
                        <Text size='sm' mb='xs'>
                            Hvem: {"Placeholder"}
                            <br/>
                            Hvor:
                            <a href={"../mainpost/" + post.id}>{"Placeholder2"}</a>

                        </Text>
                        <Group align="flex-end">
                            <Button onClick={acceptBooking}>Aksepter booking</Button>
                        </Group>
                </>
                    )
                })
                }
            </Dialog>
        </>
    )
}