/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button, Card } from 'react-bootstrap';
import {
	CalendarWeek,
	Circle,
	CircleHalf,
	CircleFill,
	PeopleFill,
	TrashFill
} from 'react-bootstrap-icons';
import { Project } from '../../redux/Project/ProjectModel';
import { DeleteModal } from './DeleteModal';

import './card.scss';

interface CardProps {
	projects: Project[];
	onDeleteProject: Function;
	setShowDeleteModal: Function;
	showDeleteModal: boolean;
}

export function ProjectCard({
	projects,
	onDeleteProject,
	setShowDeleteModal,
	showDeleteModal
}: CardProps) {
	const [currentProjectId, setCurrentProjectId] = useState('');
	const user = localStorage.getItem('user');
	const userRole = JSON.parse(user).role;
	return (
		<div className="card-container grid">
			{projects &&
				projects.length > 0 &&
				projects.map((project) => (
					<Card
						key={project._id}
						className="grid-item"
						style={{ width: '18rem' }}
					>
						<Card.Body>
							<Card.Subtitle className="mb-2 text-muted">
								Design - {project.title}
							</Card.Subtitle>
							<Card.Title>
								{project.name}
								{userRole &&
									(userRole.toLowerCase() === 'admin' ||
										userRole.toLowerCase() === 'manager') && (
										<TrashFill
											className="cursor-pointer delete-icon"
											data-testid="delete-icon"
											color="#ab1725"
											size={15}
											onClick={() => {
												setCurrentProjectId(project._id);
												setShowDeleteModal(true);
											}}
										/>
									)}
							</Card.Title>
							<img
								src="https://www.startupguys.net/wp-content/uploads/2017/07/Cloud-Based-Project-Management-System.jpg"
								alt="img1"
								className="card-img"
							/>
							<div className="project-info">
								<div className="progress-detail">
									<span className="status-info">
										{project.status &&
											project.status.toLowerCase() === 'not started' && (
												<Circle color="#ab1725" size={15} />
											)}
										{project.status &&
											project.status.toLowerCase() === 'in progress' && (
												<CircleHalf color="#e5aa23" size={15} />
											)}
										{project.status &&
											project.status.toLowerCase() === 'completed' && (
												<CircleFill color="#199d23" size={15} />
											)}

										<span className="padding-l-sm">{project.status}</span>
									</span>
									<span className="stage-info">{project.stage}</span>
								</div>
								<div className="horizontal-line" />
								<Card.Text
									className={`${
										project.description.length * 1 > 120
											? 'truncate-ellipsis'
											: ''
									} project-description`}
								>
									{project.description}
								</Card.Text>
								<div className="horizontal-line" />
								<div className="project-date">
									<div className="due-date-info">
										<CalendarWeek color="#79589f" size={15} />
										<span className="date-info padding-l-sm">
											{moment(project.dueDate).format('DD MMM, YYYY')}
										</span>
									</div>
									<span className="team-count-info">
										<PeopleFill color="#79589f" size={15} />
										<span className="team-count padding-l-sm">
											{project.teamCount || 0}
										</span>
									</span>
								</div>
							</div>
							<Link to="/project-detail" state={{ projectId: project._id }}>
								<Button variant="primary" className="card-btn">
									View details
								</Button>
							</Link>
						</Card.Body>
					</Card>
				))}
			<DeleteModal
				projectId={currentProjectId}
				show={showDeleteModal}
				onHide={() => setShowDeleteModal(false)}
				onSubmitForm={onDeleteProject}
			/>
		</div>
	);
}
