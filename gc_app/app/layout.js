/* eslint-disable @next/next/no-head-element */
'use client';
import './globals.css';
import DarkMode from './DarkMode';

export default function RootLayout({ children }) {
	return (
		<html>
            <link rel="icon" type="image/x-icon" href="http://127.0.0.1:8090/api/files/m9mawxr7i6htgxh/cyw2yz41x81a4zw/gc_favicon1_MlZ9YbPxVe.png"></link>
			<body>
                <DarkMode prop={
                    <main>{children}</main>
                }/>
			</body>
		</html>
	);
}

