import { useParams } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from 'react';
import { getRequest } from '../api';

function Project() {
	const { id } = useParams();
	const [projectInfo, setProjectInfo] = useState()
	const [serverErrors, setServerErrors] = useState()

	useEffect(() => {
		async function fetchProject() {
			const endpoint = "/project/" + id + "/"
			const { response, result } = await getRequest(endpoint)
			if (!response || !response.ok){
				setServerErrors(result)
			}
			else{
				setProjectInfo(result)
			}
		}
		fetchProject();
	}, [id])

	return (
		<div className="wb-project-container">
			{ projectInfo && (
				<div>
					<ReactMarkdown>{projectInfo.content}</ReactMarkdown>
				</div>
			)}
			{serverErrors && (
				<div className="wb-alert-container">
					<span className="wb-error">
						{Object.entries(serverErrors).map(([field, message]) => (
							<p key={field}>{String(field).charAt(0).toUpperCase() + String(field).slice(1)}: {message}</p>
						))}
					</span>
				</div>
			)}
		</div>
	)
}

export default Project;
