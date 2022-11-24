import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card, Alert } from 'react-bootstrap';

import { RootState } from '../../redux/rootReducer';
import { userSignup } from '../../redux/User/UserAction';

import './signup.scss';

export const Signup: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const roleList = ['Admin', 'Lead', 'Manager', 'Developer'];
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		role: '',
		password: ''
	});

	const { signupUser, error } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (signupUser.status === true) {
			navigate('/login');
		}
	}, [signupUser]);

	const onChangeInput = (event: React.ChangeEvent, property: string) => {
		const target = event.target as HTMLButtonElement;
		event.preventDefault();
		setFormData((prevState) => ({
			...prevState,
			[property]: target.value
		}));
	};

	const onSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();
		const formDataObj = {
			name: formData.name,
			email: formData.email,
			role: formData.role,
			password: formData.password
		};
		dispatch(userSignup({ user: formDataObj }));
	};

	return (
		<div className="page-container">
			<div className="signup-container">
				<Card className="signup-card-panel">
					<Card.Body className="signup-card-body">
						<h2 className="signup-title">Sign Up</h2>
						{error && (error.status === 'fail' || error.status === 'error') && (
							<div>
								<Alert key="danger" variant="danger">
									{`${error.message}`}
								</Alert>
							</div>
						)}
						<Form>
							<Form.Group className="mb-3" controlId="formBasicinput1">
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Name"
									className="form-input"
									value={formData.name}
									onChange={(e) => onChangeInput(e, 'name')}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicinput2">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type="email"
									placeholder="Email address"
									className="form-input"
									value={formData.email}
									onChange={(e) => onChangeInput(e, 'email')}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicinput3">
								<Form.Label>Role</Form.Label>
								<Form.Select
									aria-label="Default select example"
									name="role"
									className="form-select-input"
									value={formData.role}
									onChange={(e) => onChangeInput(e, 'role')}
								>
									<option>Select role</option>
									{roleList.map((title) => (
										<option key={title} value={title.toLowerCase()}>
											{title}
										</option>
									))}
								</Form.Select>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicinput4">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Password"
									className="form-input"
									value={formData.password}
									onChange={(e) => onChangeInput(e, 'password')}
								/>
							</Form.Group>

							<div className="btn-panel">
								<Button
									variant="primary"
									size="sm"
									type="submit"
									className="login-button"
									onClick={(e) => onSubmitForm(e)}
								>
									Signup
								</Button>
							</div>
						</Form>
					</Card.Body>
					<Card.Footer>
						<div className="login-panel-footer">
							<span>
								Already have?{' '}
								<Link to="/login" className="sign-link">
									Login
								</Link>
							</span>
						</div>
					</Card.Footer>
				</Card>
			</div>
		</div>
	);
};

export default Signup;
