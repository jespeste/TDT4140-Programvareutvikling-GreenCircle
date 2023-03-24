'use client'
import pb from "../lib/pocketbase";
import PreviousBooking from "./PreviousBooking";
import { useState, useEffect } from "react";
import Navbar from "../Navbar";
    
export default function Bookingpage() {
    const user = pb.authStore.model;
    const [bookings, setReportList] = useState([]); 
		
	const fetchbookings = async () => {
		try {
			const reportData = await pb.collection('bookings').getList(1,100,{ 
				'$autoCancel': true,
			    expand: 'owner, booker, post'
			});
			console.log(reportData);
			setReportList(reportData.items);

		} catch (err){
			console.log(err.isAbort);
		}
	}

	useEffect(()=>{
		fetchbookings();
	}, [])

	return (
		<div>
            <Navbar page="bookings"></Navbar>
            <PreviousBooking data={bookings} user={user}></PreviousBooking>
		</div>
	);
}