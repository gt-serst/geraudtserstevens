import { Link } from 'react-router-dom';
import "../styles/Navbar.css"
import hamburger from "../assets/hamburger.png"
import { useState } from "react"

function Navbar({loginStatus}) {
	const [isOpen, setIsOpen] = useState(false)

	const toggle = () => setIsOpen(!isOpen);
	const hide = () => setIsOpen(false);
	const show = () => setIsOpen(true);

	return (
		<div className="wb-navbar-container">
			<button className="wb-navbar-button" onClick={toggle} onBlur={hide}><img className="wb-hamburger" src={hamburger} alt="hamburger"/></button>
			<div className={`wb-navbar-window ${isOpen ? "active" : ""}`}>
				<nav className="wb-navbar-link">
					<Link className="wb-navbar-single-link" onClick={toggle} onBlur={hide} onFocus={show} to="/">ACCUEIL</Link>
					{loginStatus ? (
						<>
							<Link className="wb-navbar-single-link" onClick={toggle} onBlur={hide} onFocus={show} to="/profile">PROFIL</Link>
						</>
						) : (
							<>
							<Link className="wb-navbar-single-link" onClick={toggle} onBlur={hide} onFocus={show} to="/register">INSCRIPTION</Link>
							<Link className="wb-navbar-single-link" onClick={toggle} onBlur={hide} onFocus={show} to="/login">CONNEXION</Link>
						</>
					)}
					<Link className="wb-navbar-single-link" onClick={toggle} onBlur={hide} onFocus={show} to="/projects">PROJETS</Link>
					<Link className="wb-navbar-single-link" onClick={toggle} onBlur={hide} onFocus={show} to="/contact">CONTACT</Link>
				</nav>
			</div>
		</div>
	)
}

export default Navbar;
