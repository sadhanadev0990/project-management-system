import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Login } from './pages/login/Login';
import { Signup } from './pages/signup/Signup';
import { Dashboard } from './pages/dashboard/Dashboard';
import { ProjectDetail } from './pages/projects/ProjectDetail';
import { ErrorPage } from './pages/Error/ErrorPage';
import ProtectedRoute from './Route/ProtectedRoute';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/logout" element={<Navigate replace to="/login" />} />
				<Route path="/" element={<ProtectedRoute component={Dashboard} />} />
				<Route
					path="/dashboard"
					element={<ProtectedRoute component={Dashboard} />}
				/>
				<Route
					path="/projects"
					element={<ProtectedRoute component={Dashboard} />}
				/>
				<Route
					path="/project-detail"
					element={<ProtectedRoute component={ProjectDetail} />}
				/>
				<Route path="/*" element={<Navigate replace to="/error-page" />} />
				<Route path="/error-page" element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
