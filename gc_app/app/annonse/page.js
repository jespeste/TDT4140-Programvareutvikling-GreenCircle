import pb from '../lib/pocketbase';
import Annonseside from './Annonseside';

async function getPosts() {
	const data = await pb.collection('annonser').getList();
	console.log(data);
	console.log('Posts');
	return data.items;
}

export default async function Annonsepage() {
	const posts = await getPosts();
	console.log(posts);
	return (
		<div>
			{posts.map((post) => {
				return <Annonseside data={post} ></Annonseside>
			})}
			<h1>{} Her nede!</h1>
		</div>
	);
}
