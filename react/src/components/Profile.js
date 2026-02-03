import { postRequest, getRequest, logOut } from "../api";
import { useState, useEffect } from "react"
import "../styles/Profile.css"
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css"
import { useForm } from "react-hook-form"
import ErrorDispatcher from "./ErrorDispatcher";
import { FeedbackProvider } from "../utils";

function Profile({ updateLoginStatus }) {

	const navigate = useNavigate()
	const [user, setUser] = useState(null)
	const [response, setResponse] = useState(null)

	const {register: registerUsername, handleSubmit: submitUsername} = useForm()
	const {register: registerPassword, handleSubmit: submitPassword} = useForm()

	useEffect(() => {
		async function fetchProfile() {

			setResponse(null)

			const endpoint = "/account/profile/"
			const responseObject = await getRequest(endpoint)

			if (responseObject && responseObject.type === "SUCCESS") {
				setResponse(responseObject)
				setUser(responseObject.data)
			}
			else {
				updateLoginStatus(false)
				navigate("/login")
			}
		}
		fetchProfile();
	}, []);


	async function usernameOnSubmit(data){

		setResponse(null)

		const endpoint = "/account/username/"
		const responseObject = await postRequest(endpoint, data)

		if (responseObject && responseObject.type === "SUCCESS") {
			FeedbackProvider(responseObject)
			setUser({ ...user, username: responseObject.data.username })
		}

		setResponse(responseObject)
	}

	async function passwordOnSubmit(data){

		setResponse(null)

		const endpoint = "/account/password/"
		const responseObject = await postRequest(endpoint, data)

		if (responseObject && responseObject.type === "SUCCESS") {
			FeedbackProvider(responseObject)
		}

		setResponse(responseObject)
	}

	async function handleClick(){

		const responseObject = await logOut()


		if (responseObject && responseObject.type === "SUCCESS") {
			updateLoginStatus(false)
			FeedbackProvider(responseObject)
			navigate("/login")
		}

		setResponse(responseObject)
	}

	return (
		<div className="wb-profile-container">
			<div className="center-column">
			<h3>Ton profil</h3>
			{user && (
				<div>
					<p>{user.id}</p>
					<p>{user.username}</p>
					<p>{user.date_joined}</p>
				</div>
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
			{response &&
				<ErrorDispatcher response={response} />
			}
			</div>
		</div>
	)
}

export default Profile;
