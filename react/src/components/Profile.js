import { postRequest, getRequest } from "../api";
import { useState, useEffect } from "react"
import "../styles/Profile.css"
import { useNavigate } from "react-router-dom";

function Profile({ updateLoginStatus }) {
	const navigate = useNavigate()
	const [serverResponse, setServerResponse] = useState(null)
	// const [serverErrors, setServerErrors] = useState(null)

	// useEffect(() => {
	// 	const fetchProfile = async () => {
	// 		const endpoint = "/account/profile/"

	// 		const result = await getRequest(endpoint)
	// 		console.log(result)
	// 		setServerResponse(result)
	// 	}
	// 	fetchProfile()
	// }, [serverResponse]);
	useEffect(() => {
		async function fetchProfile() {
			const endpoint = "/account/profile/"
			const { response, result } = await getRequest(endpoint)
			if (!response || !response.ok){
				// setServerErrors(result)
				updateLoginStatus(false)
				navigate("/login")
			}
			// const response = await fetch("http://localhost:8000/api/account/profile/", {method: "GET", credentials: "include"})
			// const result = await response.json()
			else{
				setServerResponse(result)
			}
		}
		fetchProfile();
	}, []);
	async function handleClick(){
		await postRequest("/auth/logout/")
		updateLoginStatus(false)
		navigate("/login")
	}
	return (
		<div>
			<h3>Ton profil</h3>
			{serverResponse && (
				<span>
					{Object.entries(serverResponse).map(([field, messages]) => (
						<p key={field}>{messages}</p>
					))}
				<button type="button" onClick={handleClick}>Se déconnecter</button>
				</span>
			)}
			{/* {serverErrors && (
				<span className="wb-error-box">
						<p>{serverErrors.detail}</p>
				</span>
			)} */}
		</div>
	)
}

export default Profile;
