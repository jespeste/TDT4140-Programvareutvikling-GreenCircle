'use client';
import pb from './lib/pocketbase';
import './globals.css';
import Link from 'next/link';

export default function Navbar() {
	function logOut() {
		pb.authStore.clear();
	}
	return (
		<nav>
			<ul className="navbar">
				<li className="navbarE">
					<Link href="/annonse">Annonser</Link>
				</li>
				<li className="navbarE">
					<Link href="/user">Bruker</Link>
				</li>
				<li className="navbarE">
					<Link href="/" onClick={logOut}>
						Logg ut
					</Link>
				</li>
			</ul>
		</nav>
	);
}
