import { Link } from 'react-router-dom';
import "../styles/Navbar.css"
import logout from "../assets/power-off.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import ErrorDispatcher from "./ErrorDispatcher";
import { feedbackHandler } from "../utils";
import { logOut } from "../api";
import { useEffect, useRef } from "react";


function Navbar({loginStatus, updateLoginStatus}) {

	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)
	const [response, setResponse] = useState(null)
	const navbarRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (navbarRef.current && !navbarRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const toggle = () => setIsOpen(!isOpen);

	async function handleClick(){

		setIsOpen(!isOpen);

		const responseObject = await logOut()


		if (responseObject && responseObject.type === "SUCCESS") {
			updateLoginStatus(false)
			feedbackHandler(responseObject)
			navigate("/login")
		}

		setResponse(responseObject)
	}

	return (
		<div className="wb-navbar-container" ref={navbarRef}>
			<div className={`wb-navbar-button ${isOpen ? "active" : ""}`} onClick={toggle}>
				<div class="bar"></div>
				<div class="bar"></div>
				<div class="bar"></div>
			</div>
			<div className={`wb-navbar-window ${isOpen ? "active" : ""}`}>
				<nav className="wb-navbar-link">
					<Link className="wb-navbar-single-link" onClick={toggle} to="/">ACCUEIL</Link>
					<Link className="wb-navbar-single-link" onClick={toggle} to="/projects">PROJETS</Link>
					{loginStatus ? (
						<>
							<Link className="wb-navbar-single-link" onClick={toggle} to="/profile">PROFIL</Link>
						</>
						) : (
						<>
							{/* <Link className="wb-navbar-single-link" onClick={toggle} to="/register">INSCRIPTION</Link> */}
							<Link className="wb-navbar-single-link" onClick={toggle} to="/login">CONNEXION</Link>
						</>
					)}
					<Link className="wb-navbar-single-link" onClick={toggle} to="/contact">CONTACT</Link>
					{loginStatus && (
						<>
							<button className="wb-logout-btn" type="button" onClick={handleClick}><img className="wb-logout-logo" src={logout} alt="logout"/></button>
						</>
					)}
				</nav>
			</div>
			{response &&
				<ErrorDispatcher response={response} />
			}
		</div>
	)
}

export default Navbar;
