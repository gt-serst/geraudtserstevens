import "../styles/ProjectCard.css"
import { NavLink } from "react-router-dom";
const IMAGE_URL = "http://localhost:8000"

function ProjectCard({id, title, description, cover}) {

	return (
		<div className="center">
			<div className="property-card">
				<NavLink to={"/project/" + id}>
					<div className="property-image" style={{backgroundImage: 'url(' + IMAGE_URL + cover + ')', backgroundSize: "cover", backgroundRepeat:"no-repeat"}}>
						<div className="property-image-title">
						</div>
					</div>
				</NavLink>
				<div className="property-description">
					<h5 className="wb-project-card-header">{title}</h5>
					<p className="wb-project-card-p">{description}</p>
				</div>
			</div>
		</div>
	)
}

export default ProjectCard;
