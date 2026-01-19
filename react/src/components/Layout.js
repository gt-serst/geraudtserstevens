import Header from "./Header"
import { Link, Outlet } from "react-router-dom"

function Layout(props){
	return (
		<div>
			<nav>
				<Link to="/">Accueil</Link> |{" "}
				{props.loginStatus ? (
					<>
						<Link to="/profile">Profil</Link> |{" "}
					</>
					) : (
						<>
						<Link to="/register">Inscription</Link> |{" "}
						<Link to="/login">Connexion</Link> |{" "}
					</>
				)}
				<Link to="/contact">Contact</Link>
			</nav>
			<Header />
			<Outlet />
		</div>
	)
}

export default Layout;
