import React from 'react';
import { Button } from 'react-bootstrap';
import { FolderPlus } from 'react-bootstrap-icons';
import { ProjectCreate } from '../../pages/projects/ProjectCreate';

import './header.scss';

export const Header: React.FC = () => {
	const [modalShow, setModalShow] = React.useState(false);
	const user = localStorage.getItem('user');
	const userRole = JSON.parse(user).role;
	return (
		<div className="header-container">
			<div className="title-section">
				<div className="header-title">Project Management</div>
				<div className="header-sub-title">All Projects</div>
			</div>
			<div className="header-right-section">
				{userRole &&
					(userRole.toLowerCase() === 'admin' ||
						userRole.toLowerCase() === 'manager') && (
						<Button
							variant="primary"
							className="create-btn"
							onClick={() => setModalShow(true)}
						>
							<FolderPlus color="#fff" size={16} />

							<span className="padding-l-sm">New Project</span>
						</Button>
					)}
				<ProjectCreate show={modalShow} onHide={() => setModalShow(false)} />
			</div>
		</div>
	);
};
