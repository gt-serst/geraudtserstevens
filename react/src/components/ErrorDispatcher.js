import AlertBanner from "./AlertBanner"
import FatalError from "./FatalError"

function ErrorDispatcher({response}) {

	if (!response || response.type === "SILENT") return;

	const data = response.data
	if (!data) return;

	switch (response.type) {
		case "AUTH":
		case "FORM":
			return <AlertBanner data={data} />

		case "SYSTEM":
			return <FatalError response={response} />

		default:
			return;
	}
}

export default ErrorDispatcher;
