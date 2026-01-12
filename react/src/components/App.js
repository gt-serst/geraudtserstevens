import '../styles/App.css';
import { useState } from 'react';
import Header from './Header'
import Register from './Register'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Profile from './Profile'
import Login from './Login'
import { getRequest } from "../api"

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
	const [serverResponse, setServerResponse] = useState(null)
	async function getUserInfo(accessToken) {
		const endpoint = "/account/profile/"

		const { response, result } = await getRequest(endpoint, accessToken)
		console.log(result)
		setServerResponse(result)
		// console.log(serverResponse)
	}
	return (
		<div className="App">
			<BrowserRouter>
				<nav>
					<Link to="/register">Inscription</Link> |{" "}
					<Link to="/login">Connexion</Link> |{" "}
					<Link to="/profile">Profil</Link> |{" "}
				</nav>
				<Header />
				<Routes>
					<Route path="/register" element={<Register getUserInfo={getUserInfo}/>} />
					<Route path="/login" element={<Login getUserInfo={getUserInfo}/>} />
					<Route path="/profile" element={<Profile serverResponse={serverResponse}/>} />
				</Routes>
			</BrowserRouter>
			{/* <ul>
				{users.map((fields) => (
					<li key={fields.id}>{fields.username}</li>
				))}
			</ul> */}
		</div>
	);
}

export default App;
