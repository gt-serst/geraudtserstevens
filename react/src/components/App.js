import '../styles/App.css';
import { useState, useEffect } from 'react';
import Register from './Register'
import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from './Profile'
import Login from './Login'
import Home from './Home'
import ErrorPage from './ErrorPage';
import Layout from "./Layout"
import Contact from "./Contact"
import Projects from "./Projects"
import Project from "./Project"
import { getCookie } from '../utils'
const API_URL = "http://localhost:8000/api";


function App() {

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

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout loginStatus={loginStatus} updateLoginStatus={updateLoginStatus}/>,
			errorElement: <ErrorPage />,
			children: [
				{
					path: "/",
					element: <Home />
				},
				{
					path: "/login",
					element: loginStatus
					? <Navigate to="/profile" />
					: <Login updateLoginStatus={updateLoginStatus} />
				},
				{
					path: "/register",
					element: loginStatus
					? <Navigate to="/profile" />
					: <Register updateLoginStatus={updateLoginStatus} />
				},
				{
					path: "/profile",
					element: loginStatus
					? <Profile updateLoginStatus={updateLoginStatus} />
					: <Navigate to="/login" />
				},
				{
					path: "/projects",
					element : <Projects />
				},
				{
					path: "/project/:id",
					element: <Project />
				},
				{
					path: "/contact",
					element : <Contact />
				}
			],
		},
	]);

	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
