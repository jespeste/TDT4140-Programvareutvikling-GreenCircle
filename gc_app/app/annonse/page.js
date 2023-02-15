import pb from '../lib/pocketbase';
import Annonseside from './Annonseside';

async function getPosts() {
	const data = await pb.collection('users').getList();
	console.log(data);
	console.log('Posts');
	return data.items;
}

export default async function Annonsepage() {
	const posts = await getPosts();
	console.log(posts);
	const myUser = {
		name: 'Marrti Harrma',
		telephone: '48181451',
		email: 'larsengo@stud.ntnu.no',
		rating: '5',
		annonser: []
	};
	const myAnnonse = {
		image: 'imagesrc',
		title: 'Hammer',
		name: 'Marrti Harrma',
		location: 'Trondheim',
		description:
			'bla bla bla bla bla bla bla bla bla bla bla blabla bla bla bla bla blabla bla bla blabla blabla bla bla bla bla blabla bla bla bla bla blabla bla blaaa',
		owner: myUser,
		numfavourites: 0,
		phoneicon: 'phonesrc'
	};
	return (
		<div>
			<Annonseside data={myAnnonse} mordi={posts}></Annonseside>
			<h1>{} Her nede!</h1>
		</div>
	);
}
