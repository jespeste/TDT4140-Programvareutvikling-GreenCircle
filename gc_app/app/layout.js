/* eslint-disable @next/next/no-head-element */
'use client';
import './globals.css';
import { useState } from 'react';

export default function RootLayout({ children }) {
	const [theme, setTheme] = useState('dark');

	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	};

	return (
		<html>
			<body className={`${theme}`}>
				<div>
					<div style={{
						zIndex: 9,
						position: 'absolute',
						left: '97%',
						top: '2%',
					}}>
						<svg onClick={toggleTheme} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-moon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
						</svg>
					</div>
					<main>{children}</main>
				</div>
			</body>
		</html>
	);
}
