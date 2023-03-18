/* eslint-disable @next/next/no-head-element */
'use client';
import './globals.css';
import DarkMode from './DarkMode';

export default function RootLayout({ children }) {
	return (
		<html>
			<body>
                <DarkMode prop={
                    <main>{children}</main>
                }/>
			</body>
		</html>
	);
}

