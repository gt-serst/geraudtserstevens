import { useParams } from 'react-router-dom';


function Project() {
	const { id } = useParams();

	return (
		<div className="wb-project-container">
			<h2>Projet {id}</h2>
		</div>
	)
}

export default Project;
