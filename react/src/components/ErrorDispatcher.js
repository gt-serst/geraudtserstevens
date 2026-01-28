import AlertBanner from "./AlertBanner"
import FatalError from "./FatalError"
import { toast } from 'react-toastify';
import { useEffect } from "react"

export function useFeedback(response) {
	useEffect(() => {
		if (!response) return;

		switch (response.type) {
			case "FORM" || "AUTH":
				toast.warning(response.message)
				break;

			case "SUCCESS":
				toast.success(response.message)
				break;

			case "SYSTEM":
				toast.error(response.message)
				break;

			default:
				break;
		}
	}, [response])
}

function ErrorDispatcher(response) {
	if (!response) return null

	switch (response.type) {
		case "FORM" || "AUTH":
			return <AlertBanner errorObject={response} />

		case "SYSTEM":
			return <FatalError errorObject={response} />

		default:
			return null
	}
}

export default ErrorDispatcher;
