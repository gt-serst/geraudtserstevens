import "../styles/ProjectCard.css"
import { NavLink } from "react-router-dom";
const IMAGE_URL = "http://localhost:8000"

function ProjectCard({id, title, description, cover}) {

	return (
		// <div className="wb-project-card-container">
		<div className="center">
				<div className="property-card">
				<NavLink to={"/project/" + id}>
					<div className="property-image" style={{backgroundImage: 'url(' + IMAGE_URL + cover + ')', backgroundSize: "cover", backgroundRepeat:"no-repeat"}}>
						<div className="property-image-title">
							{/* <img className="property-image" src={IMAGE_URL + cover} alt={title + "_cover"}></img> */}
						</div>
					</div>
				</NavLink>
				<div className="property-description">
					<h5 className="wb-project-card-header">{title}</h5>
					<p className="wb-project-card-p">{description}</p>
				</div>
			</div>
		</div>
		// </div>
	)
}

export default ProjectCard;
