import pb from '../../lib/pocketbase';
import Annonseside from '../Annonseside';
import Navbar from '../../Navbar';
import 'app/mainpost/main.css';

async function getPost(id) {
	const post = await pb.collection('posts').getOne(id, {
		expand: 'owner'
	});
	return post;
}

export default async function Annonsepage({ params }) {
	const post = await getPost(params.id);
	return (
		<div className="bigcontainer">
			<Navbar></Navbar>
			<Annonseside data={post}></Annonseside>
		</div>
	);
}
