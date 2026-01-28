import { useState } from "react"
import { useForm } from "react-hook-form"
import "../styles/Contact.css"
import { postRequest } from "../api"
import ErrorDispatcher from "./ErrorDispatcher"

function Contact(){
	const { register, handleSubmit } = useForm()
	const [response, setResponse] = useState(null)

	async function onSubmit(data){
		setResponse(null)
		const endpoint = "/contact/sendmail/"
		const responseObject = await postRequest(endpoint, data)
		setResponse(responseObject)
	}

	return (
		<div className="wb-contact-container">
			<h2>Contact</h2>
			<form className="wb-contact-form" onSubmit={handleSubmit(onSubmit)}>
				<input className="wb-contact-input" type="email" placeholder="Email" {...register("from_email", {required: true})}></input>
				<input className="wb-contact-input" type="text" placeholder="Sujet "{...register("subject", {required: true})}></input>
				<textarea className="wb-contact-message" placeholder="Message" {...register("message", {required: true})}></textarea>
				<input className="wb-contact-btn-submit" type="submit" value="Envoyer"></input>
			</form>
			<ErrorDispatcher response={response} />
		</div>
	)
}

export default Contact;
