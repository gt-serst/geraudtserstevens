import { useParams } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from 'react';
import { getRequest } from '../api';
import "../styles/Project.css"
const IMG_URL = "http://localhost:8000"

function Project() {
	const { id } = useParams();
	const [projectInfo, setProjectInfo] = useState()
	const [imagesList, setImagesList] = useState()
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

	useEffect(() => {
		async function fetchImages() {
			const endpoint = "/projectimages/" + id + "/"
			const { response, result } = await getRequest(endpoint)
			if (!response || !response.ok){
				setServerErrors(result)
			}
			else{
				setImagesList(result)
			}
		}
		fetchImages();
	}, [id])

	return (
		<div className="wb-project-container">
			{projectInfo && (
				<div>
					<img className="wb-project-cover" src={IMG_URL + projectInfo.cover} alt={projectInfo.title + "_cover"}></img>
					<ReactMarkdown>{projectInfo.content}</ReactMarkdown>
				</div>
			)}
			{imagesList && (
				imagesList.map((image) => (
					<img className="wb-project-cover" src={IMG_URL + image.image} alt={image.id + "_image"}></img>
				)
			))}
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
