import { useNavigate } from "react-router-dom";
import { useState } from "react"
import { useForm } from "react-hook-form"
import { fetchRequest } from "../api";
import "../styles/Login.css"

function Login({ getUserInfo }) {
	const navigate = useNavigate()
	const [serverErrors, setServerErrors] = useState(null)
	const { register, handleSubmit } = useForm()

	async function onSubmit(data) {
		const endpoint = "/auth/login/"
		const { response, result } = await fetchRequest(endpoint, data)
		if (!response || !response.ok){
			setServerErrors(result)
		}
		else{
			getUserInfo(result.access)
			navigate("/profile/")
		}
	}

	return(
		<div>
			<h2>Connexion</h2>
			<form className="wb-form" onSubmit={ handleSubmit(onSubmit) }>
				<input type="text" placeholder="Nom d'utilisateur" {...register("username", { required: true }) }></input>
				<input type="password" placeholder="Mot de passe" {...register("password", { required: true }) }></input>
				<input type="submit" value="Se connecter"></input>
			</form>
			{ serverErrors && (
				<span className="wb-error-box">
					{Object.entries(serverErrors).map(([field, messages]) => (
						<p key={field}>{messages[0]}</p>
					))}
				</span>
			)}
		</div>
	)
}

export default Login;
