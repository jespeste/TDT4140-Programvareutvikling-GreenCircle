'use client';
import Link from 'next/link';
import pb from './lib/pocketbase';
import './navbar.css';
import { Tabs, Space, Text, Image, Card } from '@mantine/core';


export default function Navbar({page}) {
    const images = new Map([
        [
            'GC_logo',
            'http://127.0.0.1:8090/api/files/m9mawxr7i6htgxh/gyuatwoa0t4qyx7/gc_75b_AiKiOIV7Oe.png'
        ]
    ]);

	function logOut() {
		pb.authStore.clear();
	}

    function getActiveUser() {
        const activeUser = pb.authStore.model;
		return activeUser;
    }

	const activeUser = getActiveUser();


	return (
        <div>
            <Card style={{backgroundColor: '', width: '150%', position: 'fixed', zIndex: '998', height: '49px', top: '0'} } >

            </Card>
            <div>   
                <Image 
                    maw={40} 
                    mx="auto" 
                    radius="md" 
                    src={images.get('GC_logo')} 
                    alt="Login_logo"
                    style={{ zIndex: 999, position: 'fixed', top: 4, left: 6 }}/>

                <Tabs color="teal" defaultValue={page} style={{ 
                        position: 'fixed', 
                        top: 5,
                        left: 0,
                        right: 0,
                        margin: '0 auto',
                        width: '75vw', 
                        maxWidth: '1400px',
                        zIndex:9998,
                        }}>
                    <Tabs.List>

                        <Link href="/homepage" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Tabs.Tab value="home" >
                                <Text fw={500} size={15} >
                                    Hjem
                                </Text>
                            </Tabs.Tab>
                        </Link>

                        <Link href={`/user/${activeUser.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Tabs.Tab value="user" >
                                <Text fw={500} size={15} >
                                    Profil
                                </Text>
                            </Tabs.Tab>
                        </Link>

                        <Link href="/annonse" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Tabs.Tab value="posts" >
                                <Text fw={500} size={15} >
                                    Annonser
                                </Text>
                            </Tabs.Tab>
                        </Link>

                        { activeUser.isAdmin &&
                            <Link href="/reports" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Tabs.Tab value="reports" >
                                    <Text fw={500} size={15} >
                                        Rapporter
                                    </Text>
                                </Tabs.Tab>
                            </Link>
                        }

                            <Tabs.Tab value="login" ml="auto">
                                <Link href="/" onClick={logOut} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Text fw={500} size={15} >
                                        Logg ut
                                    </Text>
                                </Link>
                            </Tabs.Tab>

                    </Tabs.List>
                </Tabs> 
            </div>
        <Space h={65} style={{ position: 'static'}}></Space>
        </div>
	);
}
