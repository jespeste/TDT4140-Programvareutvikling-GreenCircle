'use client';
import React from 'react';
import './report-view.css';
import pb from '../lib/pocketbase';

/**
 * Displays a report and offers options for deleting related data-elements.
 * 
 * @param {*} reportData - Data containing report information.
 * @returns - View of a single report.
 */
export default function ReportView({reportData}) {

	async function deleteReportedPost() {
		try {
			if (confirm("Dette vil slette annonsen: " + reportData.reportedPost)) {
				await pb.collection('posts').delete(reportData.reportedPost);
				alert('Annonse fjernet: ' + reportData.reportedPost);
				document.location.reload(true);
			}
		} catch (e) {
			alert(e);
		}
	}

	async function deleteReporter() {
		try {
			if (confirm("Dette vil fjerne brukeren: " + reportData.reporter)) {
				await pb.collection('user').delete(reportData.reporter);
				alert('Rapporternde bruker fjernet: ' + reportData.reporter);
				document.location.reload(true);
			}
		} catch (e) {
			alert(e);
		}
	}

	async function deleteReportedUser() {
		try {
			if (confirm("Dette vil fjerne brukeren: " + reportData.reportedUser)) {
				await pb.collection('user').delete(reportData.reporter);
				alert('Rapportert bruker fjernet: ' + reportData.reporter);
				document.location.reload(true);
			}
		} catch (e) {
			alert(e);
		}
	}

	async function deleteReport() {
		try {
			if (confirm("Dette vil fjerne rapporten: " + reportData.id)) {
				await pb.collection('reports').delete(reportData.id);
				alert('Rapport fjernet: ' + reportData.id);
				document.location.reload(true);
			}
		} catch (e) {
			alert(e);
		}
	}

	return (
		<div className="maincontainer">

			 {<div>
				<button className="deleteButton" onClick={deleteReport}> X</button>
				<b> Rapport-ID: </b>{reportData.id}
			</div>}

			 {<div>
				 <button className="deleteButton" onClick={deleteReporter}> X</button>
				 <b> Rapportert av: </b>
				 <a href={"../user/" + reportData.reporter}>{reportData.reporter}</a>

			 </div>}

			{reportData.reportedUser != '' &&
				<div>
				 	<button className="deleteButton" onClick={deleteReportedUser}> X</button>
					<b> Rapportert bruker: </b>
					<a href={"../user/" + reportData.reportedUser}>{reportData.reportedUser}</a>
					<br />
				</div>
			}

			{reportData.reportedPost != '' &&
				<div>
				 	<button className="deleteButton" onClick={deleteReportedPost}> X</button>
					<b> Rapportert annonse: </b>
					<a href={"../mainpost/" + reportData.reportedPost}>{reportData.reportedPost}</a>
					<br />
				</div>
			}
			
			<br />
			<div>
				<b>Beskrivelse: </b>
				{/* TODO: Very long words may exceed the width of the container. */}
				{reportData.description}
			</div>

		</div>
	);
}
