const API_URL = "http://localhost:8000/api";

export async function fetchRequest(endpoint, data) {
	try {
		const response = await fetch(API_URL + endpoint, {
			method: "POST",
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

export async function getRequest(endpoint, accessToken) {
	try {
		console.log(accessToken)
		const response = await fetch(API_URL + endpoint, {
			method: "GET",
			credentials: "include",
			// headers: {"Authorization": "Bearer " + accessToken}
		});
		const result = await response.json();
		console.log(result)
		return { response, result };
	} catch (error) {
		return {
			response: null,
			result: { error: error.message }
		};
	}
}
