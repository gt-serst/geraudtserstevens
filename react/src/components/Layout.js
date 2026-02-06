import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

function Layout({loginStatus}){
	return (
		<div>
			<Navbar loginStatus={loginStatus}/>
			<Outlet />
			<Footer />
		</div>
	)
}

export default Layout;
