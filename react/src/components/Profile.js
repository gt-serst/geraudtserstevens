import { getRequest } from "../api";
import { useState } from "react"

function Profile(serverResponse) {
	// const [ serverResponse, setServerResponse ] = useState(null)

	// async function getUserInfo() {
	// 	const endpoint = "/account/profile/"

	// 	const { result, response } = getRequest(endpoint)
	// 	setServerResponse(result)
	// }
	return (
		<div>
			<h3>Ton profil</h3>
			<p><strong>Id: </strong>{serverResponse.serverResponse.id}</p>
			<p><strong>Nom d'utilisateur: </strong>{serverResponse.serverResponse.username}</p>
			<p><strong>Date d'inscription: </strong>{serverResponse.serverResponse.date_joined}</p>
			<button></button>
		</div>
	)
}

export default Profile;
