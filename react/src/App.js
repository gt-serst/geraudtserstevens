import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
	const [users, setUsers] = useState([]);
	const url = "http://localhost:8000/api/auth/register/";
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Response status: ${response.status}`);
				}

				const result = await response.json();
				setUsers(result);
				console.log(result);
			} catch (error) {
				console.error(error.message);
			}
		};

		fetchUsers();
	}, []);
	return (
		<div className="App">
			<h1>User List</h1>
			<ul>
				{users.map(user => (
					<li key={user.id}>
						<h3>{user.username}</h3>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
