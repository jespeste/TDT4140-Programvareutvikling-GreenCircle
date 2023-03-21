'use client';

import pb from '../lib/pocketbase';
import ReportContainer from './ReportsView';
import Navbar from '../Navbar';
import { useState, useEffect } from 'react';
import { Card, Title } from '@mantine/core';

export default function ReportPage() {
	const [reports, setReportList] = useState([]);

	const fetchReports = async () => {
		try {
			const reportData = await pb.collection('reports').getList(1, 100, {
				$autoCancel: true
				//  expand: 'owner'
			});
			setReportList(reportData.items);
		} catch (err) {
			console.log(err.isAbort);
		}
	};

	useEffect(() => {
		fetchReports();
	}, []);

	return (
		<div>
			<Navbar page="reports" />
			<Card
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'rgba(0, 0, 0, 0)'
				}}
			>
				<div>
					<div style={{ textAlign: 'center' }}>
						<Title order={2}> Rapport-oversikt </Title>
					</div>
					<Card
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: 'rgba(0, 0, 0, 0)'
						}}
					>
						<ReportContainer data={reports} occupiedWidth={1700} />
					</Card>
				</div>
			</Card>
		</div>
	);
}
