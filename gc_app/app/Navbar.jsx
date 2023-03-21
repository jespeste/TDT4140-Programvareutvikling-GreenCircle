'use client';
import Link from 'next/link';
import pb from './lib/pocketbase';
import './navbar.css';


export default function Navbar() {
	function logOut() {
		pb.authStore.clear();
	}
    function getActiveUser() {
        const activeUser = pb.authStore.model;
		return activeUser;
    }
	const activeUser = getActiveUser();

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
					<Link href={`/user/${activeUser.id}`}>Bruker</Link>
				</li>
				<li className='navbarE'>
					<Link href="/bookinger">Historie</Link>
				</li>
				{/* TODO: the /reports button on the navbar should only be visible when the active user is an admin. */}
				{ activeUser.isAdmin &&
				<li className="navbarE">
					<Link href="/reports">Rapporter</Link>
				</li>
				}
				<li className="navbarE">
					<Link href="/" onClick={logOut}>
						Logg ut
					</Link>
				</li>
			</ul>
		</nav>
	);
}
