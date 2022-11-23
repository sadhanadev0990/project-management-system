import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/rootReducer';

import { userLogout } from '../../redux/User/UserAction';

import './sidenav.scss';

export function SideNav() {
	const [logout, setLogout] = useState(false);

	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { userStatus } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (userStatus === true && logout) {
			navigate('/logout');
		}
	}, [userStatus, logout]);

	const handleLogout = (e: React.FormEvent) => {
		e.preventDefault();
		localStorage.removeItem('token');
		dispatch(userLogout());
		setLogout(true);
	};
	return (
		<div className="sidenav-container">
			<div className="logo-container">
				<div className="logo-icon">PMS</div>
				<div className="logo-title">
					<div className="logo-top-title">Project Management</div>
					<div className="logo-sub-title">Design System</div>
				</div>
			</div>
			<Nav defaultActiveKey="/home" className="flex-column side-nav-links">
				<Nav.Link
					href="/dashboard"
					className={`nav-link-title ${
						location.pathname === '/dashboard' ? 'nav-link-active' : ''
					}`}
				>
					Dashboard
				</Nav.Link>
				<Nav.Link
					href="/projects"
					className={`nav-link-title ${
						location.pathname === '/projects' ||
						location.pathname === '/project-detail'
							? 'nav-link-active'
							: ''
					}`}
				>
					Projects
				</Nav.Link>
				<Nav.Link
					eventKey="link-2"
					className="nav-link-title"
					onClick={(e) => handleLogout(e)}
				>
					Logout
				</Nav.Link>
			</Nav>
		</div>
	);
}
