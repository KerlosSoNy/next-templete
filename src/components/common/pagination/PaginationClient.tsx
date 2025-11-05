// components/PaginationClient.tsx
'use client';

import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';

interface PaginationClientProps {
    currentPage: number;
    totalPages: number;
    pageNumbers: (number | string)[];
    isDark?: boolean;
    withoutMargin?: boolean;
}

export function PaginationClient({
    currentPage,
    totalPages,
    pageNumbers,
    isDark,
    withoutMargin,
}: PaginationClientProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const locale = useLocale();

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        return `${pathname}?${params.toString()}`;
    };

    const ArrowIcon = ({ direction }: { direction: 'left' | 'right' }) => (
        <svg
            width="7"
            height="8"
            viewBox="0 0 7 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d={
                    direction === 'left'
                        ? 'M4.076 7.722L0.166 3.863L4.076 0.00400001H6.524L2.597 3.863L6.524 7.722H4.076Z'
                        : 'M0.404 0.00400001H2.852L6.762 3.863L2.852 7.722H0.404L4.331 3.863L0.404 0.00400001Z'
                }
                fill="#404B52"
            />
        </svg>
    );

    const buttonBaseClass = "p-2 rounded-lg bg-[#F5F5F5] border border-[#EEEEEE] w-[38px] h-[38px] flex items-center justify-center";
    const disabledClass = "disabled:opacity-50 disabled:cursor-not-allowed";

    return (
        <div
            className={`flex items-center relative z-[10] justify-center space-x-3 ${withoutMargin ? 'mt-0' : 'mt-[65px]'
                }`}
        >
            {/* Previous Button */}
            {currentPage > 1 ? (
                <Link
                    href={createPageUrl(currentPage - 1)}
                    className={`${buttonBaseClass} ${locale === 'ar' ? 'rotate-180' : ''}`}
                    aria-label="Previous page"
                >
                    <ArrowIcon direction="left" />
                </Link>
            ) : (
                <button
                    disabled
                    className={`${buttonBaseClass} ${disabledClass} ${locale === 'ar' ? 'rotate-180' : ''}`}
                    aria-label="Previous page"
                >
                    <ArrowIcon direction="left" />
                </button>
            )}

            {/* Page Numbers */}
            {pageNumbers.map((page, index) => (
                <React.Fragment key={index}>
                    {page === '...' ? (
                        <span
                            className={`px-4 py-2 ${isDark
                                ? 'text-main text-[20px] font-bold -mb-3'
                                : 'text-[20px] font-bold -mb-3 text-main'
                                }`}
                        >
                            . . .
                        </span>
                    ) : (
                        <Link
                            href={createPageUrl(page as number)}
                            className={`w-[38px] h-[38px] flex items-center justify-center font-bold text-[17px] md:px-4 py-1.5 md:py-2 rounded-lg ${currentPage === page
                                ? 'bg-[#D98E5D] text-white  '
                                : 'text-[#404B52] bg-[#F5F5F5] border-[2px] border-[#EEEEEE]'
                                }`}
                        >
                            {page}
                        </Link>
                    )}
                </React.Fragment>
            ))}

            {/* Next Button */}
            {currentPage < totalPages ? (
                <Link
                    href={createPageUrl(currentPage + 1)}
                    className={`${buttonBaseClass} ${locale === 'ar' ? 'rotate-180' : ''}`}
                    aria-label="Next page"
                >
                    <ArrowIcon direction="right" />
                </Link>
            ) : (
                <button
                    disabled
                    className={`${buttonBaseClass} ${disabledClass} ${locale === 'ar' ? 'rotate-180' : ''}`}
                    aria-label="Next page"
                >
                    <ArrowIcon direction="right" />
                </button>
            )}
        </div>
    );
}