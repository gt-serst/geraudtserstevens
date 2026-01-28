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

function ErrorDispatcher({response}) {


	if (!response)
		return null;

	const data = response.data
	switch (response.type) {
		case "AUTH":
		case "FORM":
			return <AlertBanner data={data} />

		case "SYSTEM":
			return <FatalError response={response} />

		default:
			return null;
	}
}

export default ErrorDispatcher;
