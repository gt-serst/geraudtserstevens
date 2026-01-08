import '../styles/App.css';
// import { useState, useEffect } from 'react';
import Header from './Header'
import Register from './Register'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProfilePage from './ProfilePage'

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
	return (
		<div className="App">
			<BrowserRouter>
				<nav>
					<Link to="/">Inscription</Link> |{" "}
					<Link to="/profile">Profil</Link> |{" "}
				</nav>
				<Header />
				<Routes>
					<Route path="/" element={<Register />} />
					<Route path="/profile" element={<ProfilePage />} />
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
