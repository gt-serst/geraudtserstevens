import { postRequest, getRequest, logOut } from "../api";
import { useState, useEffect } from "react"
import "../styles/Profile.css"
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css"
import { useForm } from "react-hook-form"
import ErrorDispatcher from "./ErrorDispatcher";
import { feedbackHandler } from "../utils";
import arrow from "../assets/down-arrow.png"

function Profile({ updateLoginStatus }) {

	const navigate = useNavigate()
	const [user, setUser] = useState(null)
	const [response, setResponse] = useState(null)
	const [activeIndex, setActiveIndex] = useState(null);

	const {register: registerUsername, handleSubmit: submitUsername} = useForm()
	const {register: registerPassword, handleSubmit: submitPassword} = useForm()

	useEffect(() => {
		async function fetchProfile() {

			setResponse(null)

			const endpoint = "/account/profile/"
			const responseObject = await getRequest(endpoint)

			if (responseObject && responseObject.type === "SUCCESS") {
				setResponse(responseObject)
				setUser(responseObject.data)
			}
			else {
				updateLoginStatus(false)
				navigate("/login")
			}
		}
		fetchProfile();
	}, []);


	async function usernameOnSubmit(data){

		setResponse(null)

		const endpoint = "/account/username/"
		const responseObject = await postRequest(endpoint, data)

		if (responseObject && responseObject.type === "SUCCESS") {
			feedbackHandler(responseObject)
			setUser({ ...user, username: responseObject.data.username })
		}

		setResponse(responseObject)
	}

	async function passwordOnSubmit(data){

		setResponse(null)

		const endpoint = "/account/password/"
		const responseObject = await postRequest(endpoint, data)

		if (responseObject && responseObject.type === "SUCCESS") {
			feedbackHandler(responseObject)
		}

		setResponse(responseObject)
	}

	const toggleAccordion = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<div className="wb-profile-container">
			<h2>PROFIL</h2>
			<div>
				<h2 className="wb-home-title">No game available, coming soon...</h2>
				<div className="accordion">
					<div className="accordion-item">
						<div className="accordion-title" onClick={() => toggleAccordion(0)}>
							<div>TES INFORMATIONS</div>
							<div className={`accordion-arrow ${activeIndex === 0 ? "active" : ""}`}><img className="wb-profile-arrow" src={arrow} alt="arrow"/></div>
						</div>
						<div className={`accordion-content ${activeIndex === 0 ? "active" : ""}`}>
							{user && (
								<div>
									<p className="wb-profile-info">{user.id}</p>
									<p className="wb-profile-info">{user.username}</p>
									<p className="wb-profile-info">{user.date_joined}</p>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="accordion">
					<div className="accordion-item">
						<div className="accordion-title" onClick={() => toggleAccordion(1)}>
							<div>MODIFIE TES INFORMATIONS</div>
							<div className={`accordion-arrow ${activeIndex === 1 ? "active" : ""}`}><img className="wb-profile-arrow" src={arrow} alt="arrow"/></div>
						</div>
						<div className={`accordion-content ${activeIndex === 1 ? "active" : ""}`}>
							<div className="wb-profile-update">
								<div>
									<form onSubmit={submitUsername(usernameOnSubmit)}>
										<input className="wb-input" type="text" placeholder="Nouveau nom d'utilisateur" {...registerUsername("username", { required: true })}></input>
										<input className="wb-btn" type="submit" value="Confirmer"></input>
									</form>
								</div>
								<div>
									<form onSubmit={submitPassword(passwordOnSubmit)}>
										<input className="wb-input" type="password" placeholder="Nouveau mot de passe" {...registerPassword("password", { required: true })}></input>
										<input className="wb-btn" type="submit" value="Confirmer"></input>
									</form>
								</div >
							</div>
							{response && <ErrorDispatcher response={response} />}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile;
