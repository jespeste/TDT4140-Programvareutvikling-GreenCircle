import pb from '../lib/pocketbase';

async function getPosts(){
    
    //const Pocketbase = require('pocketbase/cjs');
    //const db = new Pocketbase('http://127.0.0.1:8090');
    //const data = await db.records.getList('posts');

    
    const res = await fetch('http://127.0.0.1:8090/api/collections/posts/records?page=1');
    const data = await res.json();
    console.log(data);
    console.log("Fetched");
    return data?.items; 
}

export default async function PostsPage(){
    const posts = await getPosts();
    console.log(posts);
    console.log("hello");
    console.log(posts[0].name);
    return (
        <div>
            <h1>Posts:</h1>
            <ul>
                {posts.map((post) => {
                    return <li key={post.id}>{post.name}</li>
                })}
            </ul>
        </div>
    );
}