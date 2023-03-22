'use client'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { Modal, Button, Group} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './date.css'


export const DatePicker = (props) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [dates, setDates] = useState([]);
    console.log(props.avStart);
    console.log(props.avEnd);
    const avStartDate = new Date(props.avStart);
    const avEndDate = new Date(props.avEnd);
    console.log(avStartDate);
    console.log(avEndDate);

    const [state, setState] = useState([
        {
        startDate: avStartDate,
        //Default selected start date is today
        endDate: avEndDate, 
        //Default selected end date is the end of availability
        key: 'selection',
        color: '#17C964',
        },
    ]);

    function handleBooking(){
        close();
        const dates = [state[0].startDate, state[0].endDate];
        console.log(state[0].startDate);
        props.handleBooking(dates);
    }

    return (
        <>
        <Modal opened={opened} onClose={close} title="Booking">
        <DateRange className='notBig'
            minDate={avStartDate} 
            // Cannot select date before today.
            maxDate={avEndDate}
            // Cannot select days more than 3 months from now
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={state}
            onChange={(item) => {
            setState([item.selection]);
            }}
        />
        <Button color="green" compact onClick={handleBooking}>Book nå</Button>
        </Modal>
        <Group>
            <Button variant="subtle" color="green" compact onClick={open}>Book</Button>
        </Group>
        </>
    )
}