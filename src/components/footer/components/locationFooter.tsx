'use client'
import { RootState } from '@/utils/redux/store';
import { useTranslations } from 'next-intl';
import React from 'react'
import { useSelector } from 'react-redux';

export default function LocationFooter() {
    const t = useTranslations();
    const Footer = useSelector((state: RootState) => state?.footerSlice?.footerData)
    return (
        <div className="flex flex-row items-start col-span-1 gap-2.5">
            <svg className='shrink-0 w-[18px] h-[18px]' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.2431 3.97807C10.9001 1.67332 7.10135 1.67332 4.75835 3.97807C4.20206 4.52155 3.76003 5.17075 3.45824 5.88751C3.15644 6.60426 3.00098 7.37412 3.00098 8.15182C3.00098 8.92953 3.15644 9.69938 3.45824 10.4161C3.76003 11.1329 4.20206 11.7821 4.75835 12.3256L9.00035 16.4993L13.2431 12.3256C13.7994 11.7821 14.2414 11.1329 14.5432 10.4161C14.845 9.69938 15.0005 8.92953 15.0005 8.15182C15.0005 7.37412 14.845 6.60426 14.5432 5.88751C14.2414 5.17075 13.7994 4.52155 13.2431 3.97807ZM9.00035 10.1243C8.49935 10.1243 8.0291 9.92932 7.67435 9.57532C7.32316 9.22339 7.12593 8.74651 7.12593 8.24932C7.12593 7.75214 7.32316 7.27526 7.67435 6.92332C8.02835 6.56932 8.49935 6.37432 9.00035 6.37432C9.50135 6.37432 9.97235 6.56932 10.3263 6.92332C10.6775 7.27526 10.8748 7.75214 10.8748 8.24932C10.8748 8.74651 10.6775 9.22339 10.3263 9.57532C9.97235 9.92932 9.50135 10.1243 9.00035 10.1243Z" fill="#CFAA45" />
            </svg>
            <div className="flex flex-col">
                <span className="text-[13px] mb-1.5 text-[#222222B2] ">{t('new_footer.location.title')}</span>
                <span className="max-w-[237px]  text-[12px] text-text">{Footer?.find((item: any) => item?.key === 'business_address')?.value}</span>
            </div>
        </div>
    )
}
