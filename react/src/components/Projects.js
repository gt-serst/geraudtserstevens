import ProjectCard from "./ProjectCard"
import { useState, useEffect } from "react"
import { getRequest } from "../api"
import "../styles/Projects.css"


function Projects(){

	const [projectsList, setProjectsList] = useState()
	const [serverErrors, setServerErrors] = useState()

	useEffect(() => {
			async function fetchProject() {
				const endpoint = "/projects/"
				const { response, result } = await getRequest(endpoint)
				if (!response || !response.ok){
					setServerErrors(result)
				}
				else{
					setProjectsList(result)
				}
				console.log(projectsList)
			}
			fetchProject();
		}, [])

	return (
		<div className="wb-projects-container">
			<h2>Projets</h2>
			<ul className="wb-projects-projects-list">
				{projectsList && (
					projectsList.map((project) => (
						<span key={project.id}><ProjectCard id={project.id} title={project.title} description={project.description} cover={project.cover}/></span>
					)
				))}
			</ul>
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

export default Projects;
