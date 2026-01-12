import '../styles/Register.css'
import { useForm } from 'react-hook-form';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { fetchRequest } from "../api"

function Register() {
	const navigate = useNavigate();
	const [serverErrors, setServerErrors] = useState(null);
	const { register, handleSubmit, formState: { errors } } = useForm();

	async function onSubmit(data) {
		const endpoint = "/auth/register/";

		const { response, result } = await fetchRequest(endpoint, data);

		if (!response || !response.ok) {
			setServerErrors(result);
			return;
		}
		navigate("/profile");
	}

	return (
		<div>
			<h2>Inscription</h2>
			<form className="wb-form" onSubmit={handleSubmit(onSubmit)}>
				<input type="text" placeholder="Nom d'utilisateur" {...register("username", { required: "Username is required.", maxLength: { value: 15, message: "Username must be at most 15 characters long."} })}></input>
				{errors.username && (<span className="wb-error-box">{errors.username.message}</span>)}
				<input type="password" placeholder="Mot de passe" {...register("password", { required: "Password is required.", minLength: {value: 8, message: "Password must be at least 8 characters long."}, maxLength: {value: 15, message: "Password must be at most 15 characters long."} })}></input>
				{errors.password && (<span className="wb-error-box">{errors.password.message}</span>)}
				<input type="submit" value="S'inscrire"></input>
			</form>
			{serverErrors && (
				<div className="wb-error-box">
					{Object.entries(serverErrors).map(([field, messages]) => (
						<p key={field}>{messages[0]}</p>
					))}
				</div>
			)}
		</div>
	)
}

export default Register;
