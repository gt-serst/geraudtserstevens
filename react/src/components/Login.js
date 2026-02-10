import { useNavigate } from "react-router-dom";
import { useState } from "react"
import { useForm } from "react-hook-form"
import { postRequest } from "../api";
import "../styles/Login.css"
import ErrorDispatcher from "./ErrorDispatcher";
import { FeedbackProvider } from "../utils";
import { NavLink } from "react-router-dom";

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
			FeedbackProvider(responseObject);
			navigate("/profile/")
		}
	}

	return(
		<div className="wb-login-container">
			<h2>CONNEXION</h2>
			<div className="center-column">
				<form className="wb-form" onSubmit={ handleSubmit(onSubmit) }>
					<input className="wb-input" type="text" placeholder="Nom d'utilisateur" {...register("username", { required: true }) }></input>
					<input className="wb-input" type="password" placeholder="Mot de passe" {...register("password", { required: true }) }></input>
					<input className="wb-btn" type="submit" value="Se connecter"></input>
				</form>
				<NavLink className="wb-login-navlink" to={"/register/"}>Pas encore de compte?</NavLink>
			</div>
			<ErrorDispatcher response={response} />
		</div>
	)
}

export default Login;
