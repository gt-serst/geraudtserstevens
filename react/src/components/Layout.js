import logo from '../assets/sea-waves.png';
import Footer from "./Footer"
import { Outlet, NavLink } from "react-router-dom"
import Navbar from "./Navbar"
import "../styles/Layout.css"

function Layout({loginStatus}){
	return (
		<div className="wb-layout-container">
			<div className="wb-layout-main">
				<Navbar loginStatus={loginStatus}/>
				<Outlet />
				<div>
					<NavLink to="/"><img className="wb-logo" src={logo} alt="logo"/></NavLink>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Layout;
