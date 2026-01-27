import AlertBanner from "./AlertBanner"
import Toast from "./Toast"
import FatalError from "./FatalError"

function FeedbackDispatcher({ response }) {
	if (!response) return null

	switch (response.type) {
		case "FORM" || "AUTH":
			return <AlertBanner errorObject={response} />

		case "SUCCESS":
			return <Toast successObject={response} />

		case "SYSTEM":
			return <FatalError errorObject={response} />

		default:
			return null
	}
}

export default FeedbackDispatcher;
