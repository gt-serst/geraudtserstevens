import ProjectCard from "./ProjectCard"
import { useState, useEffect } from "react"
import { getRequest } from "../api"
import "../styles/Projects.css"
import ErrorDispatcher from "./ErrorDispatcher"


function Projects(){

	const [projectsList, setProjectsList] = useState()
	const [response, setResponse] = useState(null)

	useEffect(() => {
			async function fetchProject() {

				const endpoint = "/projects/"
				const responseObject = await getRequest(endpoint)

				setResponse(responseObject)

				if (responseObject && responseObject.type === "SUCCESS") {
					setProjectsList(responseObject.data)
				}
			}
			fetchProject();
		}, [])

	return (
		<div>
			<h2>Projets</h2>
			<div className="center">
				{projectsList && (
					projectsList.map((project) => (
						<span key={project.id}><ProjectCard id={project.id} title={project.title} description={project.description} cover={project.cover}/></span>
					)
				))}
			</div>
			<ErrorDispatcher response={response} />
		</div>
	)
}

export default Projects;
