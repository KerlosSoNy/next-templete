
import React from 'react';
import { PaginationClient } from './PaginationClient';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    isDark?: boolean;
    withoutMargin?: boolean;
}

export default function Pagination({
    isDark,
    currentPage,
    totalPages,
    withoutMargin,
}: PaginationProps) {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showEllipsis = totalPages > 7;

        if (!showEllipsis) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 3; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <PaginationClient
            currentPage={currentPage}
            totalPages={totalPages}
            pageNumbers={getPageNumbers()}
            isDark={isDark}
            withoutMargin={withoutMargin}
        />
    );
}