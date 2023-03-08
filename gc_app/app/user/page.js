import User from './User';
import Navbar from '../Navbar';
import pb from '../lib/pocketbase';

async function getPosts() {
	const record = await pb.collection('posts').getList();
	return record.items;
}

export default async function Page() {
	const posts = await getPosts();
	return (
		<div>
			<Navbar></Navbar>
			<User posts={posts}></User>
		</div>
	);
}
