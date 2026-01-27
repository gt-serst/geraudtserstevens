import "../styles/ErrorPage.css"

function FatalError({errorObject}){

	return (
		<div className="wb-error-container">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{errorObject.statusText | errorObject.status}</i>
			</p>
		</div>
	);
}

export default FatalError;
