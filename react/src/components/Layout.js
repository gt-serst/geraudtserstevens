import logo from '../assets/celtic.png';
import Footer from "./Footer"
import { Outlet, NavLink } from "react-router-dom"
import Navbar from "./Navbar"
import "../styles/Layout.css"

function Layout({loginStatus}){
	return (
		<div>
			<Navbar loginStatus={loginStatus}/>
			<div className="wb-layout-outlet">
			<Outlet />
			</div>
			<NavLink to="/"><img className="wb-layout-logo" src={logo} alt="logo"/></NavLink>
			<Footer />
		</div>
	)
}

export default Layout;
