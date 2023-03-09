import React from 'react';
import ReportView from '../report/ReportView';
import './reports-view.css';

export default function ReportContainer(props) {
	return (
		<div className="outercontainer">
			<div className="reportcontainer">
				{props.data.map((report) => {
					return <ReportView reportData={report}></ReportView>;
				})}
			</div>
		</div>
	);
}
