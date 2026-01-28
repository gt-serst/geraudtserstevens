import "../styles/AlertBanner.css"

function AlertBanner({errorObject}) {

	return (
		<div className="wb-alert-container">
			<span className="wb-error">
				{errorObject.message}
			</span>
		</div>
	)
}

export default AlertBanner;
