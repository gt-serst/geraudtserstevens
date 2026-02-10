import logo from "../assets/celtic.png"
import "../styles/Home.css"

function Home(){
	return(
		<div className="center-column">
			<img className="wb-home-logo" src={logo} alt="logo" />
			<h2 className="wb-home-title" >Explore and understand by testing</h2>
		</div>
	)
}

export default Home;
