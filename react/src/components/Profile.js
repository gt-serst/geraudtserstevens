import { postRequest, getRequest, logOut } from "../api";
import { useState, useEffect } from "react"
import "../styles/Profile.css"
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css"
import { useForm } from "react-hook-form"
import FeedbackDispatcher from "./FeedbackDispatcher";

function Profile({ updateLoginStatus }) {

	const navigate = useNavigate()
	const [userInfo, setUserInfo] = useState(null)
	const [response, setResponse] = useState(null)

	const {
		register: registerUsername,
		handleSubmit: submitUsername,
	} = useForm()

	const {
		register: registerPassword,
		handleSubmit: submitPassword,
	} = useForm()

	useEffect(() => {
		async function fetchProfile() {

			setResponse(null)

			const endpoint = "/account/profile/"
			const responseObject = await getRequest(endpoint)


			if (responseObject && responseObject.type === "SUCCESS") {
				responseObject.type = "SILENT"
				setUserInfo(responseObject.data)
			}
			else {
				updateLoginStatus(false)
				navigate("/login")
			}

			setResponse(responseObject)

		}
		fetchProfile();
	}, []);

	async function handleClick(){

		setResponse(null)

		const responseObject = await logOut()

		setResponse(responseObject)

		if (responseObject && responseObject.type === "SUCCESS") {
			updateLoginStatus(false)
			navigate("/login")
		}
	}

	async function usernameOnSubmit(data){

		setResponse(null)

		const endpoint = "/account/username/"
		const responseObject = await postRequest(endpoint, data)

		setResponse(responseObject)
	}

	async function passwordOnSubmit(data){

		setResponse(null)

		const endpoint = "/account/password/"
		const responseObject = await postRequest(endpoint, data)

		setResponse(responseObject)
	}

	return (
		<div className="wb-profile-container">
			<h3>Ton profil</h3>
			{userInfo && (
				<span>
					{Object.entries(userInfo).map(([field, messages]) => (
						<p key={field}>{messages}</p>
					))}
				</span>
			)}
			<div className="wb-profile-update-container">
				<form onSubmit={submitUsername(usernameOnSubmit)}>
					<input type="text" placeholder="Nouveau nom d'utilisateur" className="wb-update-input" {...registerUsername("username", { required: true })}></input>
					<input type="submit" value="Confirmer" className="wb-btn-submit"></input>
				</form>
				<form onSubmit={submitPassword(passwordOnSubmit)}>
					<input type="password" placeholder="Nouveau mot de passe" className="wb-update-input" {...registerPassword("password", { required: true })}></input>
					<input type="submit" value="Confirmer" className="wb-btn-submit"></input>
				</form>
				<button type="button" onClick={handleClick} className="wb-btn-logout">Se déconnecter</button>
			</div>
			<FeedbackDispatcher response={response} />
		</div>
	)
}

export default Profile;
