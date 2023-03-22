import User from '../User';
import Navbar from '../../Navbar';
import pb from '../../lib/pocketbase';

async function getUser(id) {
	const user = await pb.collection('users').getOne(id);
	return user;
}

async function getPosts() {
	const record = await pb.collection('posts').getList(1,100,{
		expand: 'owner, booker',
	});
	return record.items;
}

export default async function Page({ params }) {
	const user = await getUser(params.id);
	const posts = await getPosts();
	return (
		<div>
			<Navbar page="user"></Navbar>
			<User posts={posts} user={user} ></User>
		</div>
	);
}
