import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { RootState } from '../../redux/rootReducer';
import { userLogin } from '../../redux/User/UserAction';

import './login.scss';

export const Login: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { loginUser, error } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (loginUser.status === true) {
			navigate('/dashboard');
		}
	}, [loginUser]);

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
			email: formData.email,
			password: formData.password
		};
		dispatch(userLogin({ user: formDataObj }));
	};

	return (
		<div className="page-container">
			<div className="login-container">
				<Card className="login-card-panel">
					<Card.Body className="login-card-body">
						<h2 className="login-title">Log in to your account</h2>
						{error && (error.status === 'fail' || error.status === 'error') && (
							<div>
								<Alert key="danger" variant="danger">
									{`${error.message}`}
								</Alert>
							</div>
						)}
						<Form>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type="email"
									placeholder="Email address"
									className="form-input"
									value={formData.email}
									onChange={(e) => onChangeInput(e, 'email')}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
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
									Log In
								</Button>
							</div>
						</Form>
					</Card.Body>
					<Card.Footer>
						<div className="login-panel-footer">
							<span>
								New to?{' '}
								<Link to="/signup" className="sign-link">
									Sign Up
								</Link>
							</span>
						</div>
					</Card.Footer>
				</Card>
			</div>
		</div>
	);
};

export default Login;
