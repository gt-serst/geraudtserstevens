import '../styles/Register.css'
import { useForm } from 'react-hook-form';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Register() {
	const navigate = useNavigate();
	const [serverErrors, setServerErrors] = useState(null);
	const { register, handleSubmit, formState: { errors } } = useForm();
	const url = "http://localhost:8000/api/auth/register/";

	function onSubmit(data) {
		const registerUser = async () => {
			try {
				const response = await fetch(url, {
					method: "POST",
					body: JSON.stringify(data),
					headers: {"Content-type": "application/json; charset=UTF-8"}
				});
				const result = await response.json();
				if (!response.ok) {
					console.log(result)
					setServerErrors(result)
					return;
				}
				console.log(result);
				navigate("/profile");
			} catch (error) {
				console.log(error.message);
			}
		};
		registerUser();
	}

	return (
		<div>
			<h2>Inscription</h2>
			<form className="wb-form" onSubmit={handleSubmit(onSubmit)}>
				<input type="text" placeholder="Nom d'utilisateur" {...register("username", { required: true })}></input>
				{errors.username && <span style={{ color: "red" }}>*Username* is mandatory</span>}
				<input type="password" placeholder="Mot de passe" {...register("password", { required: true })}></input>
				{errors.password && <span style={{ color: "red" }}>*Password* is mandatory</span>}
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
