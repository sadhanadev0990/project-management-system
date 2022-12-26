import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from '../Dashboard';
import { store } from '../../../redux/store';

describe('Check if Dashboard component is rendered', () => {
	test('should check dahboard container is loaded', () => {
		const user = '{ "name":"John", "role": "admin"}';
		localStorage.setItem('user', JSON.stringify(user));
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Dashboard />
				</BrowserRouter>
			</Provider>
		);
		expect(
			container.getElementsByClassName('dashboard-container')[0]
		).toBeInTheDocument();
	});

	// test('should check delete icon and click action', () => {
	// 	const user = '{ "name":"John", "role": "admin"}';
	// 	localStorage.setItem('user', JSON.stringify(user));
	// 	const initialState = {
	// 		project: {
	// 			projectList: {
	// 				projects: [
	// 					{
	// 						id: '20',
	// 						name: 'Finance Design System',
	// 						title: 'Finance',
	// 						description:
	// 							'Finance project refers to all banking finance related project requirements and planning. This project is to handle online finance.',
	// 						stage: 'Project Initiation',
	// 						status: 'Not started',
	// 						teamCount: 10,
	// 						dueDate: '2023-09-10'
	// 					}
	// 				]
	// 			}
	// 		}
	// 	};
	// 	RenderTestComponent(<Dashboard />, {
	// 		initialState
	// 	});
	// 	expect(screen.getByTestId('delete-icon')).toBeInTheDocument();
	// });
});
