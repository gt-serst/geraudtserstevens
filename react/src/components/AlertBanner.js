import "../styles/AlertBanner.css"

function AlertBanner({data}) {

	return (
		<div className="wb-alert-container">
			<span className="wb-error">
				{data.message}
			</span>
		</div>
	)
}

export default AlertBanner;
