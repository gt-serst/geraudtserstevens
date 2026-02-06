import logo from '../assets/logo.svg';
import { Link, NavLink } from 'react-router-dom';
import "../styles/Navbar.css"
import hamburger from "../assets/hamburger.png"
import { useState } from "react"

function Navbar({loginStatus}) {
	const [isDisplayed, setIsDisplayed] = useState(false)

	function handleClick(){
		if (isDisplayed) {
			setIsDisplayed(false)
		}
		else {
			setIsDisplayed(true)
		}
	}

	return (
		<div className="wb-navbar-container">
			<div>
				<button className="wb-navbar-button" onClick={handleClick}><img className="wb-hamburger" src={hamburger} alt="hamburger"/></button>
				{isDisplayed && (
					<nav>
						<Link to="/">Accueil</Link> |{" "}
						{loginStatus ? (
							<>
								<Link to="/profile">Profil</Link> |{" "}
							</>
							) : (
								<>
								<Link to="/register">Inscription</Link> |{" "}
								<Link to="/login">Connexion</Link> |{" "}
							</>
						)}
						<Link to="/projects">Projets</Link> |{" "}
						<Link to="/contact">Contact</Link>
					</nav>
				)}
			</div>
			<NavLink to="/"><img className="wb-logo" src={logo} alt="logo"/></NavLink>
		</div>
	)
}

export default Navbar;
