import BookingConfirm from "./BookingConfirm";
import { DatePicker} from "./datePicker";

export default function Page(){
    return (
        <>
            <BookingConfirm data={[{username: "hei", id: "2313"}, {username: "hallo", id: 2321}]}></BookingConfirm>
            <DatePicker></DatePicker>
        </>
    )
}