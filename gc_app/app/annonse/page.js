import pb from '../lib/pocketbase';
import Annonsecontainer from './Annonsecontainer';
import Annonseside from './Annonseside';
import './main.css';

async function getPosts() {
	const data = await pb.collection('posts').getList();
	return data.items;
}

async function getUsers() {
	const users = await pb.collection('users').getList();
	return users.items;
}

export default async function Annonsepage() {
	const posts = await getPosts();
	const users = await getUsers();
	let list = [];
	for (let i = 0; i < posts.length; i++) {
		let tuple = [];
		let post = posts[i];
		let owner = users.filter((user) => user.id == post.owner).find((user) => user);
		tuple.push([post, owner]);
		list.push(tuple);
	}

	return (
		<div className="bigcontainer">
			<Annonseside data={list[0]}></Annonseside>
			<div className="onerow">
				<input type="text" className="searchbar" placeholder="Søk etter motorsag eller skrujern!" />
				<div className="makeAccount">Søk!</div>
			</div>
			<Annonsecontainer data2={posts} data={list} />
		</div>
	);
}
