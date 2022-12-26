import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';

import './pagination.scss';

export interface IPaginationProps {
	className: string;
	currentPageNumber: number;
	totalCount: number;
	onPageChange: Function;
	pageSize: number;
}

export const Pagination = ({
	className,
	currentPageNumber,
	totalCount,
	onPageChange,
	pageSize
}: IPaginationProps) => {
	const paginationRange = usePagination({
		currentPageNumber,
		totalCount,
		pageSize
	});
	const paginationRangeCount = paginationRange?.length || 0;

	if (currentPageNumber === 0 || paginationRangeCount < 1) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPageNumber + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPageNumber - 1);
	};
	const lastPage =
		paginationRangeCount > 0 ? paginationRange?.[paginationRangeCount - 1] : 0;

	return (
		<ul
			className={classnames('pagination-container', { [className]: className })}
		>
			<li
				className={classnames('pagination-item pagination-prev-next', {
					disabled: currentPageNumber === 1
				})}
				onClick={onPrevious}
				key="prev"
			>
				PREV
			</li>
			{paginationRangeCount > 0 &&
				paginationRange?.map((pageNumber, index) => {
					if (pageNumber === DOTS) {
						return (
							<li className="pagination-item dots" key={`dots${index}`}>
								&#8230;
							</li>
						);
					}

					return (
						<li
							className={classnames('pagination-item page-number', {
								selected: pageNumber === currentPageNumber
							})}
							onClick={() => onPageChange(pageNumber)}
							key={pageNumber}
						>
							{pageNumber}
						</li>
					);
				})}
			<li
				className={classnames('pagination-item pagination-prev-next', {
					disabled: currentPageNumber === lastPage
				})}
				onClick={onNext}
				key="next"
			>
				NEXT
			</li>
		</ul>
	);
};
