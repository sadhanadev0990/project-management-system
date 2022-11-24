/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Button, Col, Row, Form, Card } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import { Project } from '../../redux/Project/ProjectModel';
import { updateProject } from '../../redux/Project/ProjectAction';
import { RootState } from '../../redux/rootReducer';

import './projects.scss';

interface ProjectEditProps {
	project: Project;
}

export const ProjectEdit: React.FC<ProjectEditProps> = ({ project }) => {
	const [showEditForm, setShowEditForm] = React.useState(false);
	const { updateProjectStatus } = useSelector(
		(state: RootState) => state.project
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const titleList = [
		'IT',
		'Construction',
		'Healthcare',
		'Retail',
		'Insurance',
		'Finance'
	];
	const stageList = [
		'Project Initiation',
		'Project Planning',
		'Project Execution',
		'Project Monitoring & Control',
		'Project Closure'
	];
	const statusList = ['Not started', 'In Progress', 'Completed'];

	const [formData, setFormData] = useState({
		name: project.name,
		title: project.title,
		description: project.description,
		stage: project.stage,
		status: project.status,
		dueDate: project.dueDate,
		teamCount: project.teamCount
	});

	useEffect(() => {
		setFormData({
			name: project.name,
			title: project.title,
			description: project.description,
			stage: project.stage,
			status: project.status,
			dueDate: project.dueDate,
			teamCount: project.teamCount
		});
	}, [showEditForm]);

	const onChangeInput = (event: React.ChangeEvent, property: string) => {
		const target = event.target as HTMLButtonElement;
		event.preventDefault();
		setFormData((prevState) => ({
			...prevState,
			[property]: target.value
		}));
	};

	const updateProjectCallBack = useCallback(() => {
		setShowEditForm(false);
		navigate('/dashboard');
	}, [updateProjectStatus]);

	const onSubmitForm = () => {
		const dateObj = new Date(formData.dueDate);
		const dueDateSTr = moment(dateObj).format('DD MMM, YYYY');
		const formDataObj = {
			_id: project._id,
			name: formData.name,
			title: formData.title,
			description: formData.description,
			stage: formData.stage,
			status: formData.status,
			dueDate: dueDateSTr,
			teamCount: formData.teamCount * 1
		};
		dispatch(updateProject({ project: formDataObj }));
		updateProjectCallBack();
	};

	const user = localStorage.getItem('user');
	const userRole = JSON.parse(user).role;

	return (
		<div className="project-view-container">
			<Card key={project._id}>
				<Card.Body>
					{/* <Card.Subtitle className="mb-2 text-muted">
						Design - {project.title}
					</Card.Subtitle> */}
					<Card.Title>
						Project Detail{' '}
						{userRole &&
							(userRole.toLowerCase() === 'admin' ||
								userRole.toLowerCase() === 'manager') &&
							!showEditForm && (
								<Button
									variant="primary"
									className="edit-btn"
									onClick={() => setShowEditForm(true)}
								>
									<PencilSquare color="#fff" size={14} />

									<span className="padding-l-sm">EDIT</span>
								</Button>
							)}
					</Card.Title>
					<Form>
						<Row>
							<Col sm="5">
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlInput1"
								>
									<Form.Label className="form-label">Project Name:</Form.Label>
									{showEditForm ? (
										<Form.Control
											type="text"
											placeholder="Project name"
											name="name"
											value={formData.name}
											onChange={(e) => onChangeInput(e, 'name')}
										/>
									) : (
										<Form.Text>
											<div className="form-lebel-value">{project.name}</div>
										</Form.Text>
									)}
								</Form.Group>
							</Col>
							<Col sm="5">
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlInput2"
								>
									<Form.Label className="form-label">Title:</Form.Label>
									{showEditForm ? (
										<Form.Select
											aria-label="Default select example"
											name="title"
											value={formData.title}
											onChange={(e) => onChangeInput(e, 'title')}
										>
											<option>Open this select menu</option>
											{titleList.map((title) => (
												<option value={title}>{title}</option>
											))}
										</Form.Select>
									) : (
										<Form.Text muted>
											<div className="form-lebel-value">{project.title}</div>
										</Form.Text>
									)}
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col sm="10">
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlTextarea3"
								>
									<Form.Label className="form-label">Description</Form.Label>
									{showEditForm ? (
										<>
											<Form.Control
												as="textarea"
												rows={2}
												name="description"
												minLength={120}
												value={formData.description}
												onChange={(e) => onChangeInput(e, 'description')}
											/>
											<Form.Text>Minimum of 120 characters</Form.Text>
										</>
									) : (
										<Form.Text muted>
											<div className="form-lebel-value">
												{project.description}
											</div>
										</Form.Text>
									)}
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col sm="5">
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlInput4"
								>
									<Form.Label className="form-label">Stage:</Form.Label>
									{showEditForm ? (
										<Form.Select
											aria-label="Default select example"
											name="stage"
											value={formData.stage}
											onChange={(e) => onChangeInput(e, 'stage')}
										>
											<option>Open this select menu</option>
											{stageList.map((stage) => (
												<option value={stage}>{stage}</option>
											))}
										</Form.Select>
									) : (
										<Form.Text muted>
											<div className="form-lebel-value">{project.stage}</div>
										</Form.Text>
									)}
								</Form.Group>
							</Col>
							<Col sm="5">
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlInput5"
								>
									<Form.Label className="form-label">Status:</Form.Label>
									{showEditForm ? (
										<Form.Select
											aria-label="Default select example"
											name="status"
											value={formData.status}
											onChange={(e) => onChangeInput(e, 'status')}
										>
											<option>Open this select menu</option>
											{statusList.map((status) => (
												<option value={status}>{status}</option>
											))}
										</Form.Select>
									) : (
										<Form.Text muted>
											<div className="form-lebel-value">{project.status}</div>
										</Form.Text>
									)}
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col sm="5">
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlInput6"
								>
									<Form.Label className="form-label">Team Count:</Form.Label>
									{showEditForm ? (
										<Form.Control
											type="number"
											placeholder="Team Count"
											name="teamCount"
											value={formData.teamCount}
											onChange={(e) => onChangeInput(e, 'teamCount')}
										/>
									) : (
										<Form.Text muted>
											<div className="form-lebel-value">
												{project.teamCount}
											</div>
										</Form.Text>
									)}
								</Form.Group>
							</Col>
							<Col sm="5">
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlInput6"
								>
									<Form.Label className="form-label">Due Date:</Form.Label>
									{showEditForm ? (
										<Form.Control
											type="text"
											placeholder="05/11/2022"
											name="dueDate"
											value={moment(formData.dueDate).format('DD MMM, YYYY')}
											onChange={(e) => onChangeInput(e, 'dueDate')}
										/>
									) : (
										<Form.Text muted>
											<div className="form-lebel-value">
												{moment(project.dueDate).format('DD MMM, YYYY')}
											</div>
										</Form.Text>
									)}
								</Form.Group>
							</Col>
						</Row>
						{showEditForm && (
							<Row>
								<Col>
									<Button
										className="update-btn"
										onClick={() => onSubmitForm()}
										disabled={
											formData.name &&
											formData.description &&
											formData.description.length > 120 &&
											formData.stage &&
											formData.status &&
											formData.teamCount &&
											formData.title &&
											formData.dueDate
												? false
												: true
										}
									>
										Update project
									</Button>
								</Col>
							</Row>
						)}
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
};
