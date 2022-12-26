import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ProjectCard } from '../ProjectCard';
import { store } from '../../../redux/store';

describe('Check if Project card component is rendered', () => {
	const user = '{ "name":"John", "role": "admin"}';
	// jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
	// Object.setPrototypeOf(window.localStorage.setItem, jest.fn());
	window.localStorage.setItem('user', JSON.stringify(user));
	test('should load project card', () => {
		const projects = [
			{
				_id: '20',
				name: 'Finance Design System',
				title: 'Finance',
				description:
					'Finance project refers to all banking finance related project requirements and planning. This project is to handle online finance.',
				stage: 'Project Initiation',
				status: 'Not started',
				teamCount: 10,
				dueDate: '2023-09-10'
			}
		];
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<ProjectCard
						projects={projects}
						onDeleteProject={() => {}}
						setShowDeleteModal={() => {}}
						showDeleteModal
					/>
				</BrowserRouter>
			</Provider>
		);
		expect(
			container.getElementsByClassName('card-container')[0]
		).toBeInTheDocument();
	});

	test('Project info with status in progress', () => {
		const projects = [
			{
				_id: '20',
				name: 'Finance Design System',
				title: 'Finance',
				description:
					'Finance project refers to all banking finance related project requirements and planning. This project is to handle online finance.',
				stage: 'Project Initiation',
				status: 'In progress',
				teamCount: 10,
				dueDate: '2023-09-10'
			}
		];
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<ProjectCard
						projects={projects}
						onDeleteProject={() => {}}
						setShowDeleteModal={() => {}}
						showDeleteModal
					/>
				</BrowserRouter>
			</Provider>
		);
		expect(
			container.getElementsByClassName('card-container')[0]
		).toBeInTheDocument();
	});

	test('Project info with status completed', () => {
		const projects = [
			{
				_id: '20',
				name: 'Finance Design System',
				title: 'Finance',
				description:
					'Finance project refers to all banking finance related project requirements and planning. This project is to handle online finance.',
				stage: 'Project Initiation',
				status: 'Completed',
				teamCount: 10,
				dueDate: '2023-09-10'
			}
		];
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<ProjectCard
						projects={projects}
						onDeleteProject={() => {}}
						setShowDeleteModal={() => {}}
						showDeleteModal
					/>
				</BrowserRouter>
			</Provider>
		);
		expect(
			container.getElementsByClassName('card-container')[0]
		).toBeInTheDocument();
	});
});
