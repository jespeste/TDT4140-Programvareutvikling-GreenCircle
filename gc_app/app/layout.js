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
							{pb.authStore.token != '' && (
								<li className="navbarE">
									<Link href="/user">Bruker</Link>
								</li>
							)}
							{pb.authStore.token == '' && (
								<li className="navbarE">
									<Link href="/login">Bruker</Link>
								</li>
							)}
							<li className="navbarE">
								<Link href="/">Home</Link>
							</li>
							<li className="navbarE">
								<Link href="/annonse">Annonse</Link>
							</li>
							<li className="navbarE">
								<Link href="/createpost">Lag Annonse</Link>
							</li>
							<li className="navbarE" onClick={logOut}>
								<Link href="/login">Logg ut</Link>
							</li>
						</ul>
					</nav>
					{children}
				</main>
			</body>
		</html>
	);
}
