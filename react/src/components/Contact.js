import { useState } from "react"
import { useForm } from "react-hook-form"
import "../styles/Contact.css"
import { postRequest } from "../api"
import ErrorDispatcher from "./ErrorDispatcher"
import { FeedbackProvider } from "../utils"

function Contact(){
	const { register, handleSubmit } = useForm()
	const [response, setResponse] = useState(null)

	async function onSubmit(data){
		setResponse(null)
		const endpoint = "/contact/sendmail/"
		const responseObject = await postRequest(endpoint, data)
		if (responseObject && responseObject.type === "SUCCESS") {
			FeedbackProvider(responseObject)
		}
		setResponse(responseObject)
	}

	return (
		<div className="wb-contact-container">
			<div className="center-column">
				<h2>Contact</h2>
				<form className="wb-contact-form" onSubmit={handleSubmit(onSubmit)}>
					<input className="wb-input" type="email" placeholder="Email" {...register("from_email", {required: true})}></input>
					<input className="wb-input" type="text" placeholder="Sujet "{...register("subject", {required: true})}></input>
					<textarea className="wb-input" placeholder="Message" {...register("message", {required: true})}></textarea>
					<input className="wb-btn" type="submit" value="Envoyer"></input>
				</form>
				<ErrorDispatcher response={response} />
			</div>
		</div>
	)
}

export default Contact;
