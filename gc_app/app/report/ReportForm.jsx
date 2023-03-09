"use client";
import pb from '../lib/pocketbase';
import { Container, FileInput, Space } from '@mantine/core';
import { Textarea } from '@mantine/core';
import { Button } from '@mantine/core';
import { Group } from '@mantine/core';
import { createStyles } from '@mantine/core';
import { useState } from 'react';
import Report from './Report';

/**
 * Report button that opens up a form for reporting inapproptiate users/posts.
 * 
 * @param {*} reporter - The reporting user.
 * @param {*} reportedUser - The reported user.
 * @param {*} reportedPost - The reported post.
 * @returns - A button which once clicked opens up a report-form.
 */
export default function ReportPopUp({reporter, reportedUser, reportedPost}) {
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [description, setDescription] = useState('');

    const handleReportOpen = () => {
        setIsPopUpOpen(true);
    };

    const handleReportClose = () => {
    setIsPopUpOpen(false);
    };

	const useStyles = createStyles((theme) => ({
		container: {
			backgroundColor: theme.colors.gray[4],
			borderRadius: theme.radius.md,
			padding: 10,
			width: 250,
			justifyContent: 'center',
			textAlign: 'center'
		}
	}))

	const { classes }  = useStyles();

	function getActiveUser(){
		const activeUser = pb.authStore.model.id;
		return activeUser;
	}

	function isUserReport() {
		return !(reportedUser === undefined)
	}

	function isPostReport() {
		return !(reportedPost === undefined);
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		var reportedUserID = '';
		if (isUserReport()) {
			reportedUserID = reportedUser.id;
		}
		var reportedPostID = '';
		if (isPostReport()) {
			reportedPostID = reportedPost.id
		}

		var report = new Report(
            description, getActiveUser(), reportedUserID, reportedPostID);
		createReport(report);
	};

	function getReportTitle() {
		var title = "Rapportér - "
		if (isUserReport()) {
			title += reportedUser.email;
		}
		if (isPostReport()) {
			title += reportedPost.title;
		}
		return title;
	}

	async function createReport(report) {
		try {
			const record = await pb.collection('reports').create(report);
			alert('Rapport sendt!' + '\n' +
			'Beskrivelse: ' + report.description + '\n' +
			'Rapportert bruker: ' + report.reportedUser + '\n' +
			'Rapportert annonse: ' + report.reportedPost + '\n' +
			'Rapportert av: ' + report.reporter);
			handleReportClose();
		} catch (e) {
			alert(e);
		}
	}

	return (
        <div className='root'>
            <button onClick={handleReportOpen}>Rapportér</button>
            <div className="popup" style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000}}>
                { isPopUpOpen &&
                <Container size={300} px={10} className={classes.container}>
                    <form onSubmit={handleSubmit}>
                        <Textarea maxlength="256" value={description} onChange={(event) => setDescription(event.target.value)} placeholder=""
                            label={getReportTitle()} autosize minRows={2}/>
						<Space h='xs' />
						<div>
							<Group position='center' spacing='xs' grow>
								<Button type="submit" color="green" radius="lg"  >Send</Button>
								<Button type="abort" color="red" radius="lg" onClick={handleReportClose}> Avbryt</Button>
							</Group>
						</div>
                    </form>
                </Container>
                }
            </div>
        </div>
	);
}
