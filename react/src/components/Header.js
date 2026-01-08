import logo from '../assets/logo.svg';
import '../styles/Header.css'

function Header() {
	return (
		<div className="wb-header">
			<h3 className="wb-title">Mon portfolio</h3>
			<img src={logo} alt='Mon portfolio' className="wb-logo"/>
		</div>
	);
}

export default Header;
