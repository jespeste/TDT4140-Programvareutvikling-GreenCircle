/* eslint-disable @next/next/no-head-element */
'use client';
import './globals.css';

export default function RootLayout({ children }) {
	return (
		<html>
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
}
