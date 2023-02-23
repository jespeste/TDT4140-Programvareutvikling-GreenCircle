/* eslint-disable @next/next/no-head-element */
import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }) {
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
						</ul>
					</nav>
					{children}
				</main>
			</body>
		</html>
	);
}
