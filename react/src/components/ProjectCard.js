import "../styles/ProjectCard.css"

function ProjectCard({ id, title, description, cover}) {
	return (
		<div className="wb-project-card-container">
			<a href={"/project/"+id}><img className="wb-project-card-logo" src={cover} alt={title+"cover"}></img></a>
			<h3 className="wb-project-card-header">{title}</h3>
			<p className="wb-project-card-p">{description}</p>
		</div>
	)
}

export default ProjectCard;
