import pb from '../lib/pocketbase';

export default function Auth() {
    
    async function getRecords(){
        try {
            const record = await pb.collection('posts').getOne('2wqf7pg2msi3yl9');
            console.log(record.name);
        } catch (e) {
            console.log("failure");
        }
    }

    return (
    <>
        <h1>Hi!</h1>
        <form>
            <input type="text" placeholder='email'/>
            <input type="password" placeholder='password'/>
            
            <button type="submit">Login</button>
        </form>

    </>
    )
}