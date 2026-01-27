import "../styles/AlertBanner.css"

function AlertBanner({errorObject}) {

	return (
		<div className="wb-alert-container">
			<span className="wb-error">
				{Object.values(errorObject.data)[0][0]}
			</span>
		</div>
	)
}

export default AlertBanner;
