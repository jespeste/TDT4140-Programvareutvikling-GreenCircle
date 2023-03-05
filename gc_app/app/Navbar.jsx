'use client';
import Link from 'next/link';
import pb from './lib/pocketbase';

export default function Navbar() {
	function logOut() {
		pb.authStore.clear();
	}
	return (
		<nav>
			<ul className="navbar">
				<li className="navbarE">
					<Link href="/homepage">Hjem</Link>
				</li>
				<li className="navbarE">
					<Link href="/annonse">Annonser</Link>
				</li>
				<li className="navbarE">
					<Link href="/createpost">Lag Annonse</Link>
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
