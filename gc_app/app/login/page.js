'use client';
import pb from '../lib/pocketbase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './login.css';
import Register from "./registration"
import SignInForm from './SignInForm';

export default function Page() {
        return (
        <div>
            <br />
            <SignInForm/>
            <h2>Ikke bruker?</h2>
            <Register/>
		</div>
	);
}
