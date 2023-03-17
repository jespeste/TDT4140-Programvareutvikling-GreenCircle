'use client';
import pb from '../lib/pocketbase';
import './user.css';
import pb from '../lib/pocketbase';
import Annonsecontainer from '../annonse/Annonsecontainer';
import { useState } from 'react';
import { Switch } from '@mantine/core';
import ReportPopUp from '../report/ReportForm';
import ReviewPopUp from '../reviews/review/ReviewForm';

function getActiveUser() {
	return pb.authStore.model;
}

export default function User(props) {
	const user = props.user;
    const activeUser = getActiveUser();
	let posts = props.posts.filter((post) => post.owner === user.id);
	let favourites = props.posts.filter((post) => user.favourites.includes(post.id));
	const [show, setShow] = useState(false);
	function changeView() {
		setShow(!show);
	}
	return (
		<div>
			<div className="profile">
				<div className="profileinfo2">
					<div className="profilepicture">
						<img className="avatar" src={user.avatar}></img>
					</div>
				</div>
				<div className="name">
					{user.verified && <div className="verified">&#10003;</div>}
					{user.firstName + ' ' + user.lastName}
				</div>
				<div className="profilecontact">
					<button className="tlf">Telefon</button>
					<button className="mail">E-post</button>
				</div>
				<div className="favourite">
					{!(user.id === activeUser.id) && 
                        <div>
                            <ReportPopUp reporter={getActiveUser()} reportedUser={user} reportedPost={undefined} />
					        <ReviewPopUp reviewer={getActiveUser()} reviewedUser={user} reviewedPost={undefined} />
                        </div>
                    }
				</div>
			</div>
			{(user.id === activeUser.id) &&
                <div className="posts">
                    <Switch
                        onChange={changeView}
                        color="green"
                        onLabel={'Favoritter'}
                        offLabel={'Dine annonser'}
                        size="xl"
                    ></Switch>
                    {!show && <Annonsecontainer data={posts}></Annonsecontainer>}
                    {show && <Annonsecontainer data={favourites}></Annonsecontainer>}
			    </div>
            }
			{!(user.id === activeUser.id) &&
                <div className="posts">
                    <Annonsecontainer data={posts}></Annonsecontainer>
			    </div>
            }
		</div>
	);
}
