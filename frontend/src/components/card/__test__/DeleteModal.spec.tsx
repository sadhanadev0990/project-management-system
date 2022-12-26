import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { DeleteModal } from '../DeleteModal';
import { store } from '../../../redux/store';

describe('Check if Delete modal component is rendered', () => {
	test('should load Delete project modal popup', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<DeleteModal
						show
						onHide={() => {}}
						projectId="12"
						onSubmitForm={() => {}}
					/>
				</BrowserRouter>
			</Provider>
		);
		expect(screen.getByTestId('modal-title')).toBeInTheDocument();
	});

	test('check cancel button and click action', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<DeleteModal
						show
						onHide={() => {}}
						projectId="12"
						onSubmitForm={() => {}}
					/>
				</BrowserRouter>
			</Provider>
		);
		const cancelBtn = screen.getByTestId('cancel-btn');
		expect(cancelBtn).toBeInTheDocument();
		fireEvent.click(cancelBtn);
	});

	test('check delete confirm button and click action', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<DeleteModal
						show
						onHide={() => {}}
						projectId="12"
						onSubmitForm={() => {}}
					/>
				</BrowserRouter>
			</Provider>
		);
		const cancelBtn = screen.getByTestId('delete-btn');
		expect(cancelBtn).toBeInTheDocument();
		fireEvent.click(cancelBtn);
	});
});
