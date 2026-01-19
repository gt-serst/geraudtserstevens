import logo from '../assets/logo.svg';
import '../styles/Header.css'

function Header() {
	return (
		<div className="wb-header-container">
			<h3>Mon portfolio</h3>
			<img src={logo} alt='Mon portfolio' className="wb-logo"/>
		</div>
	);
}

export default Header;
