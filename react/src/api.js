const API_URL = "http://localhost:8000/api";

export async function postRequest(endpoint, data) {
	try {
		const response = await fetch(API_URL + endpoint, {
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				'X-CSRFToken': localStorage.getItem('csrfToken')
			},
			body: JSON.stringify(data),
			credentials: "include"
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
			headers: {
				'X-CSRFToken': localStorage.getItem('csrfToken')
			},
			credentials: "include"
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

export async function refreshToken() {
	try {
		const response = await fetch(API_URL + "/refresh/token/", {
			method: "POST",
			headers: {
				'X-CSRFToken': localStorage.getItem('csrfToken')
			},
			credentials: "include"
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
