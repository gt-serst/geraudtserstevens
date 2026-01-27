import { resolvePath, useParams } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from 'react';
import { getRequest } from '../api';
import "../styles/Project.css"
import FeedbackDispatcher from './FeedbackDispatcher';
const IMG_URL = "http://localhost:8000"

function Project() {
	const { id } = useParams();
	const [projectInfo, setProjectInfo] = useState()
	const [imagesList, setImagesList] = useState()
	const [response, setResponse] = useState()

	useEffect(() => {
		async function fetchProject() {

			const endpoint = "/project/" + id + "/"
			const responseObject = await getRequest(endpoint)


			if (responseObject && responseObject.type === "SUCCESS") {
				responseObject.type = "SILENT"
				setProjectInfo(responseObject.data)
			}

			setResponse(responseObject)

		}
		fetchProject();
	}, [id])

	useEffect(() => {
		async function fetchImages() {
			const endpoint = "/projectimages/" + id + "/"
			const responseObject = await getRequest(endpoint)

			setResponse(responseObject)

			if (responseObject && responseObject.type === "SUCCESS") {
				setImagesList(responseObject.data)
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
			<ul>
				{imagesList && (
					imagesList.map((image, index) => (
						<span key={index}><img className="wb-project-cover" src={IMG_URL + image.image} alt={image.id + "_image"}></img></span>
					)
				))}
			</ul>
			<FeedbackDispatcher response={response} />
		</div>
	)
}

export default Project;
