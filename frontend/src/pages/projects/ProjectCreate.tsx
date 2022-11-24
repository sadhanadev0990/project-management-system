/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, Col, Row, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, getProjects } from '../../redux/Project/ProjectAction';
import { RootState } from '../../redux/rootReducer';

import './projects.scss';

interface ModalProps {
	show: boolean;
	onHide: () => void;
}

export const ProjectCreate: React.FC<ModalProps> = ({ show, onHide }) => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		name: '',
		title: '',
		description: '',
		stage: '',
		status: '',
		dueDate: '',
		teamCount: 0
	});
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

	const { addProjectStatus } = useSelector((state: RootState) => state.project);

	const getProjectWatchlist = (page: number) => {
		dispatch(
			getProjects({
				project: {
					page
				}
			})
		);
	};

	useEffect(() => {
		if (addProjectStatus === 'success') {
			onHide();
			getProjectWatchlist(1);
		}
	}, [addProjectStatus]);

	const onChangeInput = (event: React.ChangeEvent, property: string) => {
		const target = event.target as HTMLButtonElement;
		event.preventDefault();
		setFormData((prevState) => ({
			...prevState,
			[property]: target.value
		}));
	};

	const onSubmitForm = () => {
		const dateObj = new Date(formData.dueDate);
		const dueDateSTr = moment(dateObj).format('DD MMM, YYYY');
		const formDataObj = {
			name: formData.name,
			title: formData.title,
			description: formData.description,
			stage: formData.stage,
			status: formData.status,
			dueDate: dueDateSTr,
			teamCount: formData.teamCount * 1
		};
		dispatch(createProject({ project: formDataObj }));
	};

	return (
		<div className="create-project-container">
			<Modal
				show={show}
				onHide={onHide}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				className="modal-container"
			>
				<Modal.Header closeButton>
					<Modal.Title
						id="contained-modal-title-vcenter"
						className="modal-title"
					>
						Add project
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Row>
							<Col sm="5">
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlInput1"
								>
									<Form.Label className="form-label">Project Name:</Form.Label>
									<Form.Control
										type="text"
										placeholder="Project name"
										name="name"
										value={formData.name}
										onChange={(e) => onChangeInput(e, 'name')}
									/>
								</Form.Group>
							</Col>
							<Col sm="5">
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlInput2"
								>
									<Form.Label className="form-label">Title:</Form.Label>
									<Form.Select
										aria-label="Default select example"
										name="title"
										value={formData.title}
										onChange={(e) => onChangeInput(e, 'title')}
									>
										<option>Open this select menu</option>
										{titleList.map((title) => (
											<option key={title} value={title}>
												{title}
											</option>
										))}
									</Form.Select>
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
									<Form.Control
										as="textarea"
										rows={2}
										name="description"
										minLength={120}
										value={formData.description}
										onChange={(e) => onChangeInput(e, 'description')}
									/>
									<Form.Text>Minimum of 120 characters</Form.Text>
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
									<Form.Select
										aria-label="Default select example"
										name="stage"
										value={formData.stage}
										onChange={(e) => onChangeInput(e, 'stage')}
									>
										<option>Open this select menu</option>
										{stageList.map((stage) => (
											<option key={stage} value={stage}>
												{stage}
											</option>
										))}
									</Form.Select>
								</Form.Group>
							</Col>
							<Col sm="5">
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlInput5"
								>
									<Form.Label className="form-label">Status:</Form.Label>
									<Form.Select
										aria-label="Default select example"
										name="status"
										value={formData.status}
										onChange={(e) => onChangeInput(e, 'status')}
									>
										<option>Open this select menu</option>
										{statusList.map((status) => (
											<option key={status} value={status}>
												{status}
											</option>
										))}
									</Form.Select>
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
									<Form.Control
										type="number"
										placeholder="Team Count"
										name="teamCount"
										value={formData.teamCount}
										onChange={(e) => onChangeInput(e, 'teamCount')}
									/>
								</Form.Group>
							</Col>
							<Col sm="5">
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlInput6"
								>
									<Form.Label className="form-label">Due Date:</Form.Label>
									<Form.Control
										type="text"
										placeholder="05/11/2022"
										name="dueDate"
										value={formData.dueDate}
										onChange={(e) => onChangeInput(e, 'dueDate')}
									/>
								</Form.Group>
							</Col>
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						className="create-btn"
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
						Create project
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
