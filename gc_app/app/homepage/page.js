//Denne må være her hvis du skal ha interaktivitet atm
'use client';
import './homepage.css';
import Navbar from '../Navbar';
import { Image } from '@mantine/core';
import { Space } from '@mantine/core';
import Link from 'next/link';

export default function HomePage() {
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
		],
		[
			'GC_logo',
			'http://127.0.0.1:8090/api/files/m9mawxr7i6htgxh/k9kwz27p8ekqp37/gc_logo3_275_8S63uRNkXR.png'
		]
	]);

	return (
		<div>
			<Navbar page="home"></Navbar>
			<div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						minWidth: '100vh'
					}}
				>
					<Image maw={275} mx="auto" radius="md" src={images.get('GC_logo')} alt="Login_logo" />

					<p id="homeDescription">
						<Space h={10}></Space>
						Utlånsplattformen for de som søker grønnere lommebok og grønnere fremtid.
					</p>
				</div>

				<div id="linkMenu">
					<ul id="homeMenuTop">
						<li className="homeList">
							<Link className="homeLink" href="./annonse">
								<img className="homeIcon" src={images.get('smaaelektrisk')} />
								<br />
								Småelektrisk
							</Link>
						</li>
						<li className="homeList">
							<Link className="homeLink" href="./annonse">
								<img className="homeIcon" src={images.get('handverktoy')} />
								<br />
								Håndverktøy
							</Link>
						</li>
						<li className="homeList">
							<Link className="homeLink" href="./annonse">
								<img className="homeIcon" src={images.get('nailgun')} />
								<br />
								Spikerpistol og kompressor
							</Link>
						</li>
						<li className="homeList">
							<Link className="homeLink" href="./annonse">
								<img className="homeIcon" src={images.get('storelektrisk')} />
								<br />
								Storelektrisk
							</Link>
						</li>
					</ul>
					<ul id="homeMenuBottom">
						<li className="homeList">
							<Link className="homeLink" href="./annonse">
								<img className="homeIcon" src={images.get('maaleverktoy')} />
								<br />
								Måleverktoy
							</Link>
						</li>
						<li className="homeList">
							<Link className="homeLink" href="./annonse">
								<img className="homeIcon" src={images.get('festemidler')} />
								<br />
								Lim og festemidler
							</Link>
						</li>
						<li className="homeList">
							<Link className="homeLink" href="./annonse">
								<img className="homeIcon" src={images.get('maling')} />
								<br />
								Maling
							</Link>
						</li>
						<li className="homeList">
							<Link className="homeLink" href="./annonse">
								<img className="homeIcon" src={images.get('oppbevaring')} />
								<br />
								Verktøy oppbevaring
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
