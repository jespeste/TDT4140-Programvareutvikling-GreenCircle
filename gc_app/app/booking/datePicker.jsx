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

    const [state, setState] = useState([
        {
        startDate: new Date(), 
        //Default selected start date is today
        endDate: addDays(new Date(), 4), 
        //Default selected end date is four days from today
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
            minDate={new Date()} 
            // Cannot select date before today.
            maxDate={addDays(new Date(), 90)}
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