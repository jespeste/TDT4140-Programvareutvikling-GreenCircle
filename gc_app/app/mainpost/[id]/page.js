import pb from '../../lib/pocketbase';
import Annonseside from '../Annonseside';
import Navbar from '../../Navbar';
import 'app/mainpost/main.css';

async function getPosts() {
	const data = await pb.collection('posts').getList();
	return data.items;
}

async function getUsers() {
	const users = await pb.collection('users').getList();
	return users.items;
}
async function getPost(id){
	const post = await pb.collection('posts').getOne(id, {
		expand: "owner"
	});
	console.log(post);
	return post;
}

export default async function Annonsepage({ params }) {
	console.log(params);
	//const posts = await getPosts();
	//const users = await getUsers();
	const post = await getPost(params.id);

	// const router = useRouter();

	// const query  = router.query;

	// console.log(query);

	// let list = [];
	// for (let i = 0; i < posts.length; i++) {
	// 	let tuple = [];
	// 	let post = posts[i];
	// 	let owner = users.filter((user) => user.id == post.owner).find((user) => user);
	// 	tuple.push([post, owner]);
	// 	list.push(tuple);
	// }

	return (
		<div className="bigcontainer">
			<Navbar></Navbar>
			<Annonseside data={post}></Annonseside>
		</div>
	);
}

// Annonsepage.getInitialProps = async ({query}) => {
// 	const {id} = query;

// 	return {id}
// }