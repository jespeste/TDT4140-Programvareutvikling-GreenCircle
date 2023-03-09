'use client'

import pb from '../lib/pocketbase';
import ReportContainer from './ReportsView';
import Navbar from '../Navbar';
import { useState, useEffect } from 'react';

export default function ReportPage() {

	const [reports, setReportList] = useState([]); 
		
	const fetchReports = async () => {
		try {
			const reportData = await pb.collection('reports').getList(1,100,{ 
				'$autoCancel': true,
				//  expand: 'owner'
			});
			console.log(reportData);
			setReportList(reportData.items);

		} catch (err){
			console.log(err.isAbort);
		}
	}

	useEffect(()=>{
		fetchReports();
	}, [])


	return (
		<div className="bigcontainer">
			<Navbar />
			<h2 class="headertext"> Rapport-oversikt</h2>
			<ReportContainer data={reports} />
		</div>
	);

}
