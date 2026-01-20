import ProjectCard from "./ProjectCard"
import { projectsList } from "../datas/projectsList"
import "../styles/Projects.css"

function Projects(){
	console.log(projectsList)
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
		</div>

	)
}

export default Projects;
