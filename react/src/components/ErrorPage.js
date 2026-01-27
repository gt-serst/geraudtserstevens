import { useRouteError } from "react-router-dom";
import "../styles/ErrorPage.css"

export default function ErrorPage(errorObject) {

	const error = useRouteError();

	if (error) {
		errorObject = error
	}

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
