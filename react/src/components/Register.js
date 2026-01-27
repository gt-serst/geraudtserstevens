import '../styles/Register.css'
import { useForm } from 'react-hook-form';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { postRequest } from "../api"
import FeedbackDispatcher from './FeedbackDispatcher';

function Register({ updateLoginStatus }) {

	const navigate = useNavigate();
	const [response, setResponse] = useState(null);
	const { register, handleSubmit } = useForm();

	async function onSubmit(data) {
		setResponse(null)
		const register_endpoint = "/auth/register/";
		const responseObject = await postRequest(register_endpoint, data);

		setResponse(responseObject)

		if (response && response.type === "SUCCESS") {
			const login_endpoint = "/auth/login/"
			const responseObject = await postRequest(login_endpoint, data);

			setResponse(responseObject)

			if (response && response.type === "SUCCESS") {
				updateLoginStatus(true)
				navigate("/profile");
			}
		}
	}

	return (
		<div className="wb-register-container">
			<h2>Inscription</h2>
			<form className="wb-form" onSubmit={handleSubmit(onSubmit)}>
				<input type="text" placeholder="Nom d'utilisateur" {...register("username", { required: true })}></input>
				<input type="password" placeholder="Mot de passe" {...register("password", { required: true })}></input>
				<input className="wb-register-btn-submit" type="submit" value="S'inscrire"></input>
			</form>
			<FeedbackDispatcher response={response} />
		</div>
	)
}

export default Register;
