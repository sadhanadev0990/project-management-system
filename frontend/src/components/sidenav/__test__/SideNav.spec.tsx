import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SideNav } from '../SideNav';
import { store } from '../../../redux/store';

describe('SideNav tests', () => {
	test('SideNav is rendered', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<SideNav />
				</BrowserRouter>
			</Provider>
		);
		expect(screen.getByText(/Project Management/i)).toBeInTheDocument();
	});

	test('SideNav link is clicked for projects', async () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<SideNav />
				</BrowserRouter>
			</Provider>
		);
		const projectLink = screen.getByText(/Projects/i);
		expect(projectLink).toBeInTheDocument();
		fireEvent.click(projectLink);
	});

	test('SideNav link is clicked for logout', async () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<SideNav />
				</BrowserRouter>
			</Provider>
		);
		const logoutLink = screen.getByText(/Logout/i);
		expect(logoutLink).toBeInTheDocument();
		fireEvent.click(logoutLink);
	});
});
