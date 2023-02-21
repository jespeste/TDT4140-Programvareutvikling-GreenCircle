//"use client"
import pb from '../lib/pocketbase';

async function getPosts() {
	//try {
	const data = await pb.collection('posts').getList();
	console.log(data);
	console.log('Fetched');
	return data.items;
	//} catch (err) {
	//	console.log(err);
	//}
}

export default async function PostsPage() {
	const posts = await getPosts();
	console.log(posts);
	console.log('hello');
	return (
		<div>
			<h1>Posts:</h1>
			<ul>
				{posts.map((post) => {
					return <li key={post.id}>{post.name}</li>;
				})}
			</ul>
			<div>
				<h1>heihei</h1>
			</div>
		</div>
		
	);
}
