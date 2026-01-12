const API_URL = "http://localhost:8000/api";

export async function fetchRequest(endpoint, data) {
	try {
		const response = await fetch(API_URL + endpoint, {
			method: "POST",
			credentials: "include",
			body: JSON.stringify(data),
			headers: {"Content-type": "application/json; charset=UTF-8"}
		});
		const result = await response.json();

		return { response, result };
	} catch (error) {
		return {
			response: null,
			result: { error: error.message }
		};
	}
}

export async function getRequest(endpoint) {
	try {
		const response = await fetch(API_URL + endpoint, {
			method: "GET",
			credentials: "include",
		});
		const result = await response.json();
		return { response, result };
	} catch (error) {
		return {
			response: null,
			result: { error: error.message }
		};
	}
}
