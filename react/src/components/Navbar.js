import { Link } from 'react-router-dom';
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
			{isDisplayed ? (
			<div className="wb-navbar-window">
				<button className="wb-navbar-button" onClick={handleClick}><img className="wb-hamburger" src={hamburger} alt="hamburger"/></button>
				<nav className="wb-navbar-link">
					<Link className="wb-navbar-single-link" to="/">Accueil</Link>
					{loginStatus ? (
						<>
							<Link className="wb-navbar-single-link" to="/profile">Profil</Link>
						</>
						) : (
							<>
							<Link className="wb-navbar-single-link" to="/register">Inscription</Link>
							<Link className="wb-navbar-single-link" to="/login">Connexion</Link>
						</>
					)}
					<Link className="wb-navbar-single-link" to="/projects">Projets</Link>
					<Link className="wb-navbar-single-link" to="/contact">Contact</Link>
				</nav>
			</div>
			):
			<button className="wb-navbar-button" onClick={handleClick}><img className="wb-hamburger" src={hamburger} alt="hamburger"/></button>}
		</div>
	)
}

export default Navbar;
