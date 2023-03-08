//Denne må være her hvis du skal ha interaktivitet atm
'use client';
import './homepage.css';
import Navbar from '../Navbar';
import pb from '../lib/pocketbase';

// export async function getServerSideProps(){
//   const record = await pb.collection('icons');
//   const data = record.items;
//   return { props: { data }};
// }

export default function HomePage() {
	// const icons =[];
	// for(const icon in data){
	//   const url = pb.getFileUrl(icon);
	//   icons.push(url);
	// }

	const images = new Map([
		[
			'smaaelektrisk',
			'http://127.0.0.1:8090/api/files/m9mawxr7i6htgxh/j3t0cuaoftavav5/electric_nfXIf04pqo.png'
		],
		[
			'festemidler',
			'http://127.0.0.1:8090/api/files/m9mawxr7i6htgxh/yieg6knfxr9r5rv/festemidler_LVfneloVQ8.png'
		],
		[
			'handverktoy',
			'http://127.0.0.1:8090/api/files/m9mawxr7i6htgxh/ks4l3rpsd4d6dqe/hammer_nail_q3BnLiq5Y4.png'
		],
		[
			'maling',
			'http://127.0.0.1:8090/api/files/m9mawxr7i6htgxh/0p4v35ftke3bsee/maling_BDsBd7TkFJ.png'
		],
		[
			'maaleverktoy',
			'http://127.0.0.1:8090/api/files/m9mawxr7i6htgxh/bavwqor4n896tb1/maleverktoy_WIDbQda3Vs.png'
		],
		[
			'nailgun',
			'http://127.0.0.1:8090/api/files/m9mawxr7i6htgxh/8s2ouzu3seew5v5/nailgun_bJS5hkqeWJ.png'
		],
		[
			'oppbevaring',
			'http://127.0.0.1:8090/api/files/m9mawxr7i6htgxh/fxcbgiw8c0i64el/oppbevaring_X5ss4xQLIt.png'
		],
		[
			'storelektrisk',
			'http://127.0.0.1:8090/api/files/m9mawxr7i6htgxh/vc4tzx1n5dkf0zf/storelektrisk_yryhRpzfku.png'
		]
	]);

	return (
		<div id="homeWrap">
			<Navbar></Navbar>
			<h1 id="homeHeader">Velkommen til greencircle</h1>
			<p id="homeDescription">
				Vi er en utleieplattform hvor du kan leie ut dine verktøy og redskaper, og i tillegg leie
				andre sine vertøy og redskaper
			</p>

			<div id="linkMenu">
				<ul id="homeMenuTop">
					<li className="homeList">
						<a className="homeLink" href="./annonse">
							<img className="homeIcon" src={images.get('smaaelektrisk')} />
							<br />
							Småelektrisk
						</a>
					</li>
					<li className="homeList">
						<a className="homeLink" href="./annonse">
							<img className="homeIcon" src={images.get('handverktoy')} />
							<br />
							Håndverktøy
						</a>
					</li>
					<li className="homeList">
						<a className="homeLink" href="./annonse">
							<img className="homeIcon" src={images.get('nailgun')} />
							<br />
							Spikerpistol og kompressor
						</a>
					</li>
					<li className="homeList">
						<a className="homeLink" href="./annonse">
							<img className="homeIcon" src={images.get('storelektrisk')} />
							<br />
							Storelektrisk
						</a>
					</li>
				</ul>
				<ul id="homeMenuBottom">
					<li className="homeList">
						<a className="homeLink" href="./annonse">
							<img className="homeIcon" src={images.get('maaleverktoy')} />
							<br />
							Måleverktoy
						</a>
					</li>
					<li className="homeList">
						<a className="homeLink" href="./annonse">
							<img className="homeIcon" src={images.get('festemidler')} />
							<br />
							Lim og festemidler
						</a>
					</li>
					<li className="homeList">
						<a className="homeLink" href="./annonse">
							<img className="homeIcon" src={images.get('maling')} />
							<br />
							Maling
						</a>
					</li>
					<li className="homeList">
						<a className="homeLink" href="./annonse">
							<img className="homeIcon" src={images.get('oppbevaring')} />
							<br />
							Verktøy oppbevaring
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}