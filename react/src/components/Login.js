import { useNavigate } from "react-router-dom";
import { useState } from "react"
import { useForm } from "react-hook-form"
import { postRequest } from "../api";
import "../styles/Login.css"
import ErrorDispatcher, { useFeedback } from "./ErrorDispatcher";

function Login({ updateLoginStatus }) {
	const navigate = useNavigate()
	const [response, setResponse] = useState(null)
	const { register, handleSubmit } = useForm()

	async function onSubmit(data) {

		const endpoint = "/auth/login/"
		const responseObject = await postRequest(endpoint, data)

		setResponse(responseObject)

		if (responseObject && responseObject.type === "SUCCESS"){
			updateLoginStatus(true)
			navigate("/profile/")
		}
	}

	useFeedback(response);

	return(
		<div className="wb-login-container">
			<h2>Connexion</h2>
			<form className="wb-form" onSubmit={ handleSubmit(onSubmit) }>
				<input type="text" placeholder="Nom d'utilisateur" {...register("username", { required: true }) }></input>
				<input type="password" placeholder="Mot de passe" {...register("password", { required: true }) }></input>
				<input className="wb-login-btn-submit" type="submit" value="Se connecter"></input>
			</form>
			<ErrorDispatcher response={response} />
		</div>
	)
}

export default Login;
