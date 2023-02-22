import pb from '../lib/pocketbase';
import Annonseside from './Annonseside';
import Annonse from './Annonse';
import Search from './Search';
import PostList from './PostList';

async function getPosts() {
<<<<<<< HEAD
	const posts = await pb.collection('posts').getList();
	return posts.items;
}

async function getUsers() {
	const users = await pb.collection('brukere').getList();
	return users.items;
=======
	const data = await pb.collection('annonser').getList();
	console.log(data);
	console.log('Posts');
	return data.items;
>>>>>>> main
}

export default async function Annonsepage() {
	const posts = await getPosts();
<<<<<<< HEAD
	const users = await getUsers();
	return (
	<div>
		<Search></Search>
		<PostList posts={posts} users={users}></PostList>
		
	</div>
=======
	console.log(posts);
	return (
		<div>
			{posts.map((post) => {
				return <Annonseside data={post} ></Annonseside>
			})}
			<h1>{} Her nede!</h1>
		</div>
>>>>>>> main
	);
}
