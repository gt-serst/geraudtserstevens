import logo from "../assets/celtic.png"
import "../styles/Home.css"

function Home(){
	return(
		<div className="center-column">
			<img className="wb-home-logo" src={logo} alt="logo" />
		</div>
	)
}

export default Home;
