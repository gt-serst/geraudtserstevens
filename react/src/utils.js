import { toast } from 'react-toastify';

export function getCookie(name) {
	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			// Checks if this cookie string starts with the name we want
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

let responseObject = {
	type: "AUTH" | "FORM" | "SYSTEM" | "SUCCESS" | "SILENT",
	statusText: undefined,
	status: undefined,
	data: undefined
}

export async function responseHandler(response){
	if (!response) {
		responseObject.type = "SYSTEM"
	}
	else{
		if (!response.ok){
			switch (response.status) {
				case 401:
					responseObject.type = "AUTH"
					break
				case 400:
					responseObject.type = "FORM"
					break
				case 404:
					responseObject.type = "SYSTEM"
					break
				case 500:
					responseObject.type = "SYSTEM"
					break
				default:
					responseObject.type = "SYSTEM"
			}
		}
		else {
			responseObject.type = "SUCCESS"
		}
	}
	if (response.headers.get('content-type') === "application/json") {
		responseObject.data = await response.json()
	}
	else if (response.headers.get('content-type') === "text/plain")
		responseObject.data = await response.text()
	responseObject.statusText = response.statusText
	responseObject.status = response.status
	return responseObject
}

export function FeedbackProvider(response) {

	if (!response || response.type === "SILENT") return;

	const data = response.data
	if (!data) return;

	switch (response.type) {
		case "AUTH":
		case "FORM":
			toast.warning(data.message)
			break;

		case "SUCCESS":
			toast.success(data.message)
			break;

		case "SYSTEM":
			toast.error(data.message)
			break;

		default:
			break;
	}
}
