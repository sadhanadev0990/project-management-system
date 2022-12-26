import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

describe('Pagination tests', () => {
	test('Pagination is rendered', () => {
		render(
			<Pagination
				className="pagination-bar"
				currentPageNumber={1}
				totalCount={2}
				onPageChange={() => {}}
				pageSize={20}
			/>
		);
		expect(screen.getByText(/PREV/i)).toBeInTheDocument();
	});
	test('Pagination - Prev Icon click action - page 1', () => {
		render(
			<Pagination
				className="pagination-bar"
				currentPageNumber={1}
				totalCount={2}
				onPageChange={() => {}}
				pageSize={20}
			/>
		);
		expect(screen.getByText(/PREV/i)).toBeInTheDocument();
		const prevIcon = screen.getByText(/PREV/i);
		fireEvent.click(prevIcon);
	});
	test('Pagination with totalcount 2 - page 2', () => {
		render(
			<Pagination
				className="pagination-bar"
				currentPageNumber={2}
				totalCount={100}
				onPageChange={() => {}}
				pageSize={10}
			/>
		);
		expect(screen.getByText(/2/i)).toBeInTheDocument();
		const prevIcon = screen.getByText(/2/i);
		fireEvent.click(prevIcon);
	});
	test('Pagination with right dots', () => {
		render(
			<Pagination
				className="pagination-bar"
				currentPageNumber={4}
				totalCount={300}
				onPageChange={() => {}}
				pageSize={10}
			/>
		);
		expect(screen.getByText(/4/i)).toBeInTheDocument();
		const prevIcon = screen.getByText(/4/i);
		fireEvent.click(prevIcon);
	});
	test('Pagination with left dots', () => {
		render(
			<Pagination
				className="pagination-bar"
				currentPageNumber={30}
				totalCount={300}
				onPageChange={() => {}}
				pageSize={10}
			/>
		);
		expect(screen.getByText(/30/i)).toBeInTheDocument();
		const prevIcon = screen.getByText(/30/i);
		fireEvent.click(prevIcon);
	});
	test('Pagination - Next Icon click action', () => {
		render(
			<Pagination
				className="pagination-bar"
				currentPageNumber={1}
				totalCount={2}
				onPageChange={() => {}}
				pageSize={20}
			/>
		);
		expect(screen.getByText(/NEXT/i)).toBeInTheDocument();
		const nextIconElem = screen.getByText(/NEXT/i);
		fireEvent.click(nextIconElem);
	});
});
