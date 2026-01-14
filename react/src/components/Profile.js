import { postRequest, getRequest } from "../api";
import { useState, useEffect } from "react"
import "../styles/Profile.css"
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css"
import { useForm } from "react-hook-form"

function Profile({ updateLoginStatus }) {
	const navigate = useNavigate()
	const [userInfo, setUserInfo] = useState(null)
	const [serverErrors, setServerErrors] = useState(null)
	const [serverResponse, setServerResponse] = useState(null)
	const {
		register: registerUsername,
		handleSubmit: submitUsername,
		formState: { errors: usernameErrors }
	} = useForm()
	const {
		register: registerPassword,
		handleSubmit: submitPassword,
		formState: { errors: passwordErrors }
	} = useForm()
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
				setUserInfo(result)
			}
		}
		fetchProfile();
	}, []);

	async function handleClick(){
		await postRequest("/auth/logout/")
		updateLoginStatus(false)
		navigate("/login")
	}

	async function usernameOnSubmit(data){
		const endpoint = "/account/username/"
		const { response, result } = await postRequest(endpoint, data)
		if (!response || !response.ok){
			setServerErrors(result)
			setServerResponse(null)
		}
		else{
			setServerResponse(result)
			setServerErrors(null)
		}
	}

	async function passwordOnSubmit(data){
		const endpoint = "/account/password/"
		const { response, result } = await postRequest(endpoint, data)
		if (!response || !response.ok){
			setServerErrors(result)
			setServerResponse(null)
		}
		else{
			setServerResponse(result)
			setServerErrors(null)
		}
	}

	return (
		<div>
			<h3>Ton profil</h3>
			{userInfo && (
				<span>
					{Object.entries(userInfo).map(([field, messages]) => (
						<p key={field}>{messages}</p>
					))}
				<div className="wb-update">
					<form onSubmit={submitUsername(usernameOnSubmit)}>
						<input type="text" placeholder="Nouveau nom d'utilisateur" className="wb-update-input" {...registerUsername("username", { required: "New username is required.", maxLength: { value: 15, message: "Username must be at most 15 characters long."} })}></input>
						<input type="submit" value="Confirmer" className="wb-btn-submit"></input>
					</form>
					<form onSubmit={submitPassword(passwordOnSubmit)}>
						<input type="password" placeholder="Nouveau mot de passe" className="wb-update-input" {...registerPassword("password", { required: "New password is required.", minLength: {value: 8, message: "Password must be at least 8 characters long."}, maxLength: {value: 15, message: "Password must be at most 15 characters long."} })}></input>
						<input type="submit" value="Confirmer" className="wb-btn-submit"></input>
					</form>
				</div>
				<div className="wb-alert-container">
					{usernameErrors.username &&
						(<span className="wb-error"><p>{usernameErrors.username.message}</p></span>)}
					{passwordErrors.password &&
						(<span className="wb-error"><p>{passwordErrors.password.message}</p></span>)}
					{serverErrors &&
						(<span className="wb-error">
							{Object.entries(serverErrors).map(([field, message]) => (
								<p key={field}>{message}</p>
							))}
						</span>)}
					{serverResponse &&
						(<span className="wb-success">
							{Object.entries(serverResponse).map(([field, message]) => (
								<p key={field}>{message}</p>
							))}
						</span>)
					}
					<button type="button" onClick={handleClick} className="wb-btn-logout">Se déconnecter</button>
				</div>
				</span>
			)}
			{/* {serverErrors && (
				<span className="wb-error">
						<p>{serverErrors.detail}</p>
				</span>
			)} */}
		</div>
	)
}

export default Profile;
