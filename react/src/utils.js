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

export async function responseHandler(response){

	const responseObject = {
		type: "SYSTEM",
		statusText: undefined,
		status: undefined,
		data: undefined,
		message: undefined,
	}

	if (!response) {
		responseObject.type = "SYSTEM"
	}
	else{
		if (!response.ok){
			switch (response.status) {
				case 401:
				case 403:
					responseObject.type = "AUTH"
					break
				case 400:
					responseObject.type = "FORM"
					break
				case 404:
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
	const contentType = response.headers.get('content-type')
	if (contentType && contentType.includes("application/json")) {
		responseObject.data = await response.json()
	}
	else if (contentType && contentType.includes("text/plain"))
		responseObject.data = await response.text()
	responseObject.statusText = response.statusText
	responseObject.status = response.status
	return responseObject
}

export function feedbackHandler(response) {

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
