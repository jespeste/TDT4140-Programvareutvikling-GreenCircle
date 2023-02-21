import pb from '../lib/pocketbase';
import Annonseside from './Annonseside';
import Annonse from './Annonse';
import Annonsecontainer from './Annonsecontainer';

async function getPosts() {
	const posts = await pb.collection('posts').getList();
	return posts.items;
}

async function getUsers() {
	const users = await pb.collection('brukere').getList();
	return users.items;
}

export default async function Annonsepage() {
	const posts = await getPosts();
	const users = await getUsers();
	return <Annonsecontainer posts={posts} users={users}></Annonsecontainer>;
}
