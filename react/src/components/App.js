import '../styles/App.css';
import { useState, useEffect } from 'react';
import Header from './Header'
import Register from './Register'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Profile from './Profile'
import Login from './Login'
import Home from './Home'

function App() {
	// const [users, setUsers] = useState([]);
	// const url = "http://localhost:8000/api/auth/register/";
	// useEffect(() => {
	// 	const fetchUsers = async () => {
	// 		try {
	// 			const response = await fetch(url);
	// 			if (!response.ok) {
	// 				throw new Error(`Response status: ${response.status}`);
	// 			}

	// 			const result = await response.json();
	// 			setUsers(result);
	// 			console.log(result);
	// 		} catch (error) {
	// 			console.error(error.message);
	// 		}
	// 	};

	// 	fetchUsers();
	// }, []);
	// const [serverResponse, setServerResponse] = useState(null)
	// async function getUserInfo(accessToken) {
	// 	const endpoint = "/account/profile/"

	// 	const result = await getRequest(endpoint, accessToken)
	// 	console.log(result)
	// 	setServerResponse(result)
	// 	console.log(serverResponse)
	// }
	const savedLoginStatus = localStorage.getItem("cart")
	const [loginStatus, updateLoginStatus] = useState(savedLoginStatus ? localStorage.getItem("loginStatus") : false)
	useEffect(() => {
		localStorage.setItem('loginStatus', loginStatus)
	}, [loginStatus])
	return (
		<div className="App">
			{loginStatus ? (
			<BrowserRouter>
				<nav>
					<Link to="/">Accueil</Link> |{" "}
					<Link to="/profile">Profil</Link> |{" "}
				</nav>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<Profile updateLoginStatus={updateLoginStatus}/>} />
				</Routes>
			</BrowserRouter>
			) :
			(
				<BrowserRouter>
				<nav>
					<Link to="/">Accueil</Link> |{" "}
					<Link to="/register">Inscription</Link> |{" "}
					<Link to="/login">Connexion</Link> |{" "}
				</nav>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register updateLoginStatus={updateLoginStatus}/>} />
					<Route path="/login" element={<Login updateLoginStatus={updateLoginStatus}/>} />
				</Routes>
			</BrowserRouter>
			)}
			{/* <ul>
				{users.map((fields) => (
					<li key={fields.id}>{fields.username}</li>
				))}
			</ul> */}
		</div>
	);
}

export default App;
