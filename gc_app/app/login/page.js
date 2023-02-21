"use client"
import pb from "../lib/pocketbase"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Register from "./registration"

export default function Page() {
    const [isLoading, setLoading] = useState();
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    console.log(register('email'));

    async function login(data){
        setLoading(true);
        try{
            const authData = await pb.collection('users').authWithPassword(
                data.email,
                data.password,
            );
        } catch (e) {
            alert(e);
        }
        setLoading(false);
        if(pb.authStore.isValid){
            router.push("/annonse");
        }
    }

    return (<div>
        {/* <h2>Logget inn: {pb.authStore.isValid.toString()}</h2> */}
        {isLoading && <p>Loading</p>}
        <form onSubmit={handleSubmit(login)}>
            <input type="text" placeholder='email' {...register("email")} />
            <input type="password" placeholder='password' {...register("password")}/>
            <button type="submit" disabled={isLoading}>Login</button>
        </form>
        <Register/>
        </div>
    )
}