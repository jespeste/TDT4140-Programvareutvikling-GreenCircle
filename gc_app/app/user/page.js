"use client"
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function Page() {
    const router = useRouter();
    const { register, handleSubmit } = useForm();

    console.log(register('email'));

    const handleClick = () => {
            router.push('/');
    }

    return (<div>
        <button type="button" onClick={handleClick}>
        Click me
        </button>
        <form>
            <input type="text" placeholder='email' />
            <input type="text" placeholder='password' />

            <button type="submit">Login</button>
        </form>
        </div>
    )
}