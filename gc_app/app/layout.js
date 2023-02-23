/* eslint-disable @next/next/no-head-element */
'use client';
import pb from './lib/pocketbase';
import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }) {
	function logOut() {
		pb.authStore.clear();
	}
	return (
		<html>
			<body>
				<main>
					<nav>
						<ul className="navbar">
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
							<li className='navbarE'>
								<Link href="/createpost">Lag Annonse</Link>
							</li>
							<li className="navbarE">
								<button onClick={logOut}>Logg ut</button>
							</li>
						</ul>
					</nav>
					{children}
				</main>
			</body>
		</html>
	);
}
