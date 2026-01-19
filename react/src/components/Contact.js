import { useState } from "react"
import { useForm } from "react-hook-form"
import "../styles/Contact.css"
import { postRequest } from "../api"

function Contact(){
	const { register, handleSubmit } = useForm()
	const [serverErrors, setServerErrors] = useState(null)
	const [serverResponse, setServerResponse] = useState(null)

	async function onSubmit(data){
		const endpoint = "/contact/sendmail/"
		const { response, result } = await postRequest(endpoint, data)
		console.log(response)
		console.log(result)
		if (!response || !response.ok) {
			setServerErrors(result)
			setServerResponse(null)
		}
		else {
			setServerResponse(result)
			setServerErrors(null)
		}
		console.log(serverErrors)
		console.log(serverResponse)

	}

	return (
		<div className="wb-contact-container">
			<h2>Contact</h2>
			<form className="wb-contact-form" onSubmit={handleSubmit(onSubmit)}>
				{/* <p className="wb-contact-header">Email</p> */}
				<input className="wb-contact-input" type="email" placeholder="Email" {...register("from_email", {required: true})}></input>
				{/* <p className="wb-contact-header">Sujet</p> */}
				<input className="wb-contact-input" type="text" placeholder="Sujet "{...register("subject", {required: true})}></input>
				{/* <p className="wb-contact-header">Message</p> */}
				<textarea className="wb-contact-message" placeholder="Message" {...register("message", {required: true})}></textarea>
				<input className="wb-contact-btn-submit" type="submit" value="Envoyer"></input>
			</form>
			<div className="wb-alert-container">
				{serverErrors && (
					<span className="wb-error">
						{Object.entries(serverErrors).map(([field, messages]) => (
							<p key={field}>{String(field).charAt(0).toUpperCase() + String(field).slice(1)}: {messages}</p>
						))}
					</span>
				)}
				{serverResponse && (
					<span className="wb-success">
						{Object.entries(serverResponse).map(([field, messages]) => (
							<p key={field}>{messages}</p>
						))}
					</span>
				)}
			</div>
		</div>
	)
}

export default Contact;
