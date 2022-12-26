/* eslint-disable consistent-return */
import { useMemo } from 'react';

export const DOTS = '...';

export interface IPaginationProps {
	currentPageNumber: number;
	totalCount: number;
	pageSize: number;
}

const range = (start: number, end: number) => {
	const length = end - start + 1;
	return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
	currentPageNumber,
	totalCount,
	pageSize
}: IPaginationProps) => {
	const paginationRange = useMemo(() => {
		const totalPageCount = Math.ceil(totalCount / pageSize);
		const totalPageNumbers = 6;

		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount);
		}

		const leftSiblingIndex = Math.max(currentPageNumber - 1, 1);
		const rightSiblingIndex = Math.min(currentPageNumber + 1, totalPageCount);

		const shouldShowLeftDots = leftSiblingIndex > 2;
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

		const firstPageIndex = 1;
		const lastPageIndex = totalPageCount;

		if (!shouldShowLeftDots && shouldShowRightDots) {
			const leftItemCount = 5;
			const leftRange = range(1, leftItemCount);
			return [...leftRange, DOTS, totalPageCount];
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			const rightItemCount = 5;
			const rightRange = range(
				totalPageCount - rightItemCount + 1,
				totalPageCount
			);
			return [firstPageIndex, DOTS, ...rightRange];
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			const middleRange = range(leftSiblingIndex, rightSiblingIndex);
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
		}
	}, [totalCount, pageSize, currentPageNumber]);

	return paginationRange;
};
