import { responseHandler } from "./utils"
const API_URL = "http://localhost:8000/api";

const errorObject = {
	type: "SYSTEM",
	status: 0,
	statusText: "Network Error",
	message: "Impossible de contacter le serveur."
}

export async function postRequest(endpoint, data) {
	try {
		let response = await fetch(API_URL + endpoint, {
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				'X-CSRFToken': localStorage.getItem('csrfToken')
			},
			body: JSON.stringify(data),
			credentials: "include"
		});
		if (response.status === 401) {
			const refreshResponse = await refreshToken()
			if (!refreshResponse || !refreshResponse.ok) {
				return logOut()
			}
			response = await fetch(API_URL + endpoint, {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					'X-CSRFToken': localStorage.getItem('csrfToken')
				},
				body: JSON.stringify(data),
				credentials: "include"
			});
		}
		return responseHandler(response)
	} catch (error) {
		return errorObject
	}
}

export async function getRequest(endpoint) {
	try {
		let response = await fetch(API_URL + endpoint, {
			method: "GET",
			headers: {
				'X-CSRFToken': localStorage.getItem('csrfToken')
			},
			credentials: "include"
		});
		if (response.status === 401) {
			const refreshResponse = await refreshToken()
			if (!refreshResponse || !refreshResponse.ok) {
				return logOut()
			}
			response = await fetch(API_URL + endpoint, {
				method: "GET",
				headers: {
					'X-CSRFToken': localStorage.getItem('csrfToken')
				},
				credentials: "include"
			});
		}
		return responseHandler(response)
	} catch (error) {
		return errorObject
	}
}

export async function refreshToken() {
	try {
		const response = await fetch(API_URL + "/auth/refreshtoken/", {
			method: "POST",
			credentials: "include"
		});
		return response
	} catch (error) {
		return errorObject
	}
}

export async function logOut(){
	try {
		const response = await fetch(API_URL + "/auth/logout/", {
			method: "POST",
			credentials: "include"
		});
		return responseHandler(response)
	} catch (error) {
		return errorObject
	}
}
