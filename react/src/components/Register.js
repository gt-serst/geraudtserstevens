import '../styles/Register.css'
import { useForm } from 'react-hook-form';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { postRequest } from "../api"
const API_URL = "http://localhost:8000/api";

function Register({ updateLoginStatus }) {
	const navigate = useNavigate();
	const [serverErrors, setServerErrors] = useState(null);
	const { register, handleSubmit, formState: { errors } } = useForm();

	async function onSubmit(data) {
		const endpoint = "/auth/register/";

		const { response, result } = await postRequest(endpoint, data);

		if (!response || !response.ok) {
			setServerErrors(result);
		}
		else {
			await fetch(API_URL + "/auth/login/", {
				method: "POST",
				credentials: "include",
				body: JSON.stringify(data),
				headers: { "Content-Type": "application/json" }
		});
		updateLoginStatus(true)
		navigate("/profile");
		}
	}

	return (
		<div>
			<h2>Inscription</h2>
			<form className="wb-form" onSubmit={handleSubmit(onSubmit)}>
				<input type="text" placeholder="Nom d'utilisateur" {...register("username", { required: true })}></input>
				<input type="password" placeholder="Mot de passe" {...register("password", { required: true })}></input>
				<input type="submit" value="S'inscrire"></input>
			</form>
			<div className="wb-alert-container">
				{/* {errors.username &&
					(<span className="wb-error"><p>{errors.username.message}</p></span>)}
				{errors.password &&
					(<span className="wb-error"><p>{errors.password.message}</p></span>)} */}
				{serverErrors && (
					<span className="wb-error">
					{Object.entries(serverErrors).map(([field, messages]) => (
							<p key={field}>{messages[0]}</p>
						))}
					</span>
				)}
			</div>
		</div>
	)
}

export default Register;
