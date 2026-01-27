import "../styles/ProjectCard.css"
import { NavLink } from "react-router-dom";
const IMAGE_URL = "http://localhost:8000"

function ProjectCard({id, title, description, cover}) {

	return (
		<div className="wb-project-card-container">
			<NavLink to={"/project/" + id}><img className="wb-project-card-logo" src={IMAGE_URL + cover} alt={title + "_cover"}></img></NavLink>
			<h3 className="wb-project-card-header">{title}</h3>
			<p className="wb-project-card-p">{description}</p>
		</div>
	)
}

export default ProjectCard;
