'use client';
import './navbar.css';
import Link from 'next/link';



export default function Navbar() {
    function logOut() {
		pb.authStore.clear();
	}
	return (
        <nav>
            <ul className="navbar">
                <li className="navbarE" id="greenCircle">
                    <Link href="/">GreenCircle</Link>
                </li>
                <li className="navbarE">
                    <Link href="/login">Login</Link>
                </li>
                <li className="navbarE">
                    <Link href="/user">User</Link>
                </li>
                <li className="navbarE">
                    <Link href="/">Home</Link>
                </li>
                <li className="navbarE">
                    <Link href="/annonse">Annonse</Link>
                </li>
                {/* <li className="navbarE" id='logout'>
                    <button onClick={logOut}>Logg ut</button>
                    <Link href="/">Logout</Link>
                </li> */}
            </ul>
        </nav>
		
	);
}
