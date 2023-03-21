'use client'
import { Text } from "@mantine/core";
import Link from "next/link";

export default function PreviousBooking(props){
    const bookings = props.data;
    console.log(bookings);
    const user = props.user;
    console.log(user);

    return (
        <>
        {(bookings.length == 0) ? (<h2>Ingen har booket fra deg :(</h2>) : (
            <h2>Tidligere bookinger</h2>
        )}
        {bookings.filter((post)=>post.owner == user.id).map((post)=>{
            return (
                <Text>
                    Eier: <Link href={"../user/" + post.owner}>{post.owner}</Link>
                    <br></br>
                    Låner: <Link href={"../user/" + post.booker}>{post.booker}</Link>
                </Text>
            )
        })
        }  
        </>
    )
}