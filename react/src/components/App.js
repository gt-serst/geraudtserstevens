import '../styles/App.css';
import { useState, useEffect } from 'react';
import Header from './Header'
import Register from './Register'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Profile from './Profile'
import Login from './Login'
import Home from './Home'
import ErrorPage from './ErrorPage';
import { getCookie } from '../utils'
const API_URL = "http://localhost:8000/api";


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
	const savedLoginStatus = localStorage.getItem("loginStatus")

	const [loginStatus, updateLoginStatus] = useState(savedLoginStatus === "true");

	useEffect(() => {
		localStorage.setItem('loginStatus', loginStatus)
	}, [loginStatus])

	useEffect(() => {
		const fetchCsrf = async () => {
			await fetch(API_URL + "/csrftoken/", {
				credentials: "include",
			});
			localStorage.setItem('csrfToken', getCookie("csrftoken"));
		};

		fetchCsrf();
	}, []);

	return (
		<div className="App">
			<BrowserRouter>
				<nav>
					<Link to="/">Accueil</Link> |{" "}
					{loginStatus ? (
						<>
							<Link to="/profile">Profil</Link>
						</>
					) : (
						<>
							<Link to="/register">Inscription</Link> |{" "}
							<Link to="/login">Connexion</Link>
						</>
					)}
				</nav>
				<Header />
					<Routes>
						<Route
							path="/"
							element={<Home />}
							errorElement={<ErrorPage />} />
						<Route
							path="/login"
							element={loginStatus ? <Navigate to="/profile" /> : <Login updateLoginStatus={updateLoginStatus} />}
							errorElement={<ErrorPage />}
						/>
						<Route
							path="/register"
							element={loginStatus ? <Navigate to="/profile" /> : <Register updateLoginStatus={updateLoginStatus} />}
							errorElement={<ErrorPage />}
						/>
						<Route
							path="/profile"
							element={loginStatus ? <Profile updateLoginStatus={updateLoginStatus} /> : <Navigate to="/login" />}
							errorElement={<ErrorPage />}
						/>
					</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
