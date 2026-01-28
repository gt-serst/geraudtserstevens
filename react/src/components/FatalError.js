import "../styles/ErrorPage.css"

function FatalError({response}){

	return (
		<div className="wb-error-container">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{response.statusText | response.status}</i>
			</p>
		</div>
	);
}

export default FatalError;
