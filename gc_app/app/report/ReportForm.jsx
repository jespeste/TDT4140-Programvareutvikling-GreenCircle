'use client';
import pb from '../lib/pocketbase';
import { Container, FileInput, Space } from '@mantine/core';
import { Textarea } from '@mantine/core';
import { Button } from '@mantine/core';
import { Group } from '@mantine/core';
import { Title } from '@mantine/core';
import { useState } from 'react';
import Report from './Report';
import './button.css';

import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button } from '@mantine/core';
    
    /**
     * Report button that opens up a form for reporting inapproptiate users/posts.
    *
    * @param {*} reporter - The reporting user.
    * @param {*} reportedUser - The reported user.
    * @param {*} reportedPost - The reported post.
    * @returns - A button which once clicked opens up a report-form.
    */
   export default function ReportPopUp({ reportedUser, reportedPost }) {
    const [opened, { open, close }] = useDisclosure(false);
	const [description, setDescription] = useState('');

	function getActiveUser() {
		const activeUser = pb.authStore.model.id;
		return activeUser;
	}

	function isUserReport() {
		return !(reportedUser === undefined);
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
			reportedPostID = reportedPost.id;
		}

		var report = new Report(description, getActiveUser(), reportedUserID, reportedPostID);
		createReport(report);
	};

	function getReportTitle() {
		var title = 'Rapportér - ';
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
			await pb.collection('reports').create(report);
			alert(
				'Rapport sendt!' +
					'\n' +
					'Beskrivelse: ' +
					report.description +
					'\n' +
					'Rapportert bruker: ' +
					report.reportedUser +
					'\n' +
					'Rapportert annonse: ' +
					report.reportedPost +
					'\n' +
					'Rapportert av: ' +
					report.reporter
			);
            close();
		} catch (e) {
			alert(e);
		}
	}

	return (
		<div className="root">
            <Modal opened={opened} onClose={close} withCloseButton={false} centered>
            {/* <Modal opened={opened} onClose={close} title={getReportTitle()} centered> */}
                {/* <h2 position="center">{getReportTitle()} </h2> */}
                <Title order={3} weight={100} align="center">{getReportTitle()}</Title>
                <form onSubmit={handleSubmit}>
                    <Textarea
                        maxlength="256"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder=""
                        autosize
                        minRows={2}
                    />
                    <Space h="xs" />
                    <div>
                        <Group position="center" spacing="xs" grow>
                            <Button type="submit" color="green" radius="lg">
                                Send
                            </Button>
                            <Button type="abort" color="red" radius="lg" onClick={(e) => { e.preventDefault(); close(); }}>
                                {' '}
                                Avbryt
                            </Button>
                        </Group>
                    </div>
                </form>
            </Modal>

            <Group position="center">
                <Button onClick={open} className="reportbutton">Rapportér </Button>
            </Group>
		</div>
	);
}
