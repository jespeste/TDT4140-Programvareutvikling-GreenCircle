'use client';
import React from 'react';
import Link from 'next/link';
import './report-view.css';
import pb from '../lib/pocketbase';
import { useState } from 'react';
import { Tooltip, Text, Title, Space, Button, UnstyledButton, Card, Action, Table } from '@mantine/core';


/**
 * Displays a report and offers options for deleting related data-elements.
 * 
 * @param {*} reportData - Data containing report information.
 * @returns - View of a single report.
 */
export default function ReportView({reportData}) {
	const activeUser = pb.authStore.model;

    const [reportExists, setReportExists] = useState(reportData.reporter !== '');
	const [reporterExists, setReporterExists] = useState(reportData.reporter !== '');
	const [reportedUserExists, setReportedUserExists] = useState(reportData.reportedUser !== '');
	const [reportedPostExists, setReportedPostExists] = useState(reportData.reportedPost !== '');

    

    const reports = [
        { id: reportData.id, reporter: reportData.reporter, reportedUser: reportData.reportedUser, reportedPost: reportData.reportedPost },
      ];

    const rows = reports.map((report) => (
        <tr key={report.id}>
          <td>{report.id}</td>
          <td>{report.reporter}</td>
          <td>{report.reportedUser}</td>
          <td>{report.reportedPost}</td>
        </tr>
      ));

      async function deleteReport() {
          try {
              if (confirm("Dette vil fjerne rapporten: " + reportData.id)) {
                  await pb.collection('reports').delete(reportData.id);
                  alert('Rapport fjernet: ' + reportData.id);
                  setReportExists(false);
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
                    setReporterExists(false);
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
                    setReportedUserExists(false);
                }
            } catch (e) {
                alert(e);
            }
        }

        async function deleteReportedPost() {
            try {
                if (confirm("Dette vil slette annonsen: " + reportData.reportedPost)) {
                    await pb.collection('posts').delete(reportData.reportedPost);
                    alert('Annonse fjernet: ' + reportData.reportedPost);
                    setReportedPostExists(false);
                }
            } catch (e) {
                alert(e);
        }
    }


	return (
		<>
		{ activeUser.isAdmin &&
		<div>
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{width: '700px', justifyContent: 'center'} }>
            <Table>
            <thead>
                <tr>

                    <th>
                        <Text>
                            
                            {"Rapport "}
                            {reportExists &&
                                <Button variant="subtle" color="red" compact onClick={deleteReport}>
                                    Slett
                                </Button>
                            } 
                            {!reportExists &&
                                <Tooltip label="Finnes ikke">
                                    <Button variant="subtle" color="red" compact
                                              data-disabled
                                              sx={{ '&[data-disabled]': { pointerEvents: 'all' } }}
                                            >
                                        Slett
                                    </Button>
                                </Tooltip>
                            }   
                        </Text>
                    </th>
                    
                    <th>
                        <Text>
                            {"Sender "}
                            {reporterExists &&
                                <Button variant="subtle" color="red" compact onClick={deleteReporter}>
                                    Slett
                                </Button>
                            } 
                            {!reporterExists &&
                                <Tooltip label="Finnes ikke">
                                    <Button variant="subtle" color="red" compact
                                            data-disabled
                                            sx={{ '&[data-disabled]': { pointerEvents: 'all' } }}
                                            >
                                        Slett
                                    </Button>
                                </Tooltip>
                            }   
                        </Text>
                    </th>

                    <th>
                        <Text>
                            {"Bruker "}
                            {reportedUserExists &&
                                <Button variant="subtle" color="red" compact onClick={deleteReportedUser}>
                                    Slett
                                </Button>
                            } 
                            {!reportedUserExists &&
                                <Tooltip label="Finnes ikke">
                                    <Button variant="subtle" color="red" compact
                                            data-disabled
                                            sx={{ '&[data-disabled]': { pointerEvents: 'all' } }}
                                            >
                                        Slett
                                    </Button>
                                </Tooltip>
                            }   
                        </Text>
                    </th>

                    <th>
                        <Text>
                            {"Annonse "}
                            {reportedPostExists &&
                                <Button variant="subtle" color="red" compact onClick={deleteReportedPost}>
                                    Slett
                                </Button>
                            } 
                            {!reportedPostExists &&
                                <Tooltip label="Finnes ikke">
                                    <Button variant="subtle" color="red" compact
                                                data-disabled
                                                sx={{ '&[data-disabled]': { pointerEvents: 'all' } }}
                                            >
                                        Slett
                                    </Button>
                                </Tooltip>
                            }   
                        </Text>
                    </th>



                </tr>
            </thead>
            <tbody>{
                <tr key={reportData.id}>
                    <td>
                        {reportData.id}
                    </td>

                    <td>
                        <Link href={"../user/" + reportData.reporter}>{reportData.reporter}</Link> 
                    </td>

                    <td>
                        <Link href={"../user/" + reportData.reportedUser}>{reportData.reportedUser}</Link>
                    </td>

                    <td>
                        <Link href={"../mainpost/" + reportData.reportedPost}>{reportData.reportedPost}</Link>
                    </td>
                </tr>
                }
            </tbody>
            </Table>
                <div style={{textAlign: "center"}}>
                    {reportData.description !== '' &&
                        <>
                        <Title order={5}>Beskrivelse: </Title>
                        <Text>{reportData.description}</Text>
                        </>
                    }
                    {reportData.description === '' &&
                        <Title order={5}> Ingen beskrivelse gitt </Title>
                    }
                </div>
            </Card>
		</div>
		}
		{ !activeUser.isAdmin &&
			<Title order={5}> Administrator-begrenset </Title>
		}
		</>
	);
}
