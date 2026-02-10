import '../styles/Register.css'
import { useForm } from 'react-hook-form';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { postRequest } from "../api"
import ErrorDispatcher from './ErrorDispatcher';
import { FeedbackProvider } from '../utils';

function Register({ updateLoginStatus }) {

	const navigate = useNavigate();
	const [response, setResponse] = useState(null);
	const { register, handleSubmit } = useForm();

	async function onSubmit(data) {

		setResponse(null)

		const register_endpoint = "/auth/register/";
		const responseObject = await postRequest(register_endpoint, data);

		setResponse(responseObject)

		if (responseObject && responseObject.type === "SUCCESS") {

			const login_endpoint = "/auth/login/"
			const responseObject = await postRequest(login_endpoint, data);

			if (responseObject && responseObject.type === "SUCCESS") {
				updateLoginStatus(true)
				FeedbackProvider(responseObject)
				navigate("/profile");
			}

			setResponse(responseObject)

		}
	}

	return (
		<div className="wb-register-container">
			<h2>INSCRIPTION</h2>
			<div className="center-column">
				<form className="wb-form" onSubmit={handleSubmit(onSubmit)}>
					<input className="wb-input" type="text" placeholder="Nom d'utilisateur" {...register("username", { required: true })}></input>
					<input className="wb-input" type="password" placeholder="Mot de passe" {...register("password", { required: true })}></input>
					<input className="wb-btn" type="submit" value="S'inscrire"></input>
				</form>
				<ErrorDispatcher response={response} />
			</div>
		</div>
	)
}

export default Register;
