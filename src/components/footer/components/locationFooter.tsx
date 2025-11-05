'use client'
import { RootState } from '@/utils/redux/store';
import { useTranslations } from 'next-intl';
import React from 'react'
import { useSelector } from 'react-redux';

export default function LocationFooter() {
    const t = useTranslations();
    const Footer = useSelector((state: RootState) => state?.footerSlice?.footerData)
    return (
        <div className="flex flex-row items-center col-span-1 gap-2.5">
            <div className="w-[36px] lg:w-[40px] h-[36px] lg:h-[40px]  shrink-0 flex items-center justify-center bg-[#4A3F35] rounded-full">
                <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.6571 2.30377C10.5331 -0.769227 5.46814 -0.769227 2.34414 2.30377C1.60242 3.02841 1.01305 3.894 0.610657 4.84968C0.208265 5.80536 0.000976563 6.83184 0.000976562 7.86877C0.000976562 8.90571 0.208265 9.93219 0.610657 10.8879C1.01305 11.8435 1.60242 12.7091 2.34414 13.4338L8.00014 18.9988L13.6571 13.4338C14.3989 12.7091 14.9882 11.8435 15.3906 10.8879C15.793 9.93219 16.0003 8.90571 16.0003 7.86877C16.0003 6.83184 15.793 5.80536 15.3906 4.84968C14.9882 3.894 14.3989 3.02841 13.6571 2.30377ZM8.00014 10.4988C7.33214 10.4988 6.70514 10.2388 6.23214 9.76677C5.76389 9.29752 5.50092 8.66169 5.50092 7.99877C5.50092 7.33586 5.76389 6.70002 6.23214 6.23077C6.70414 5.75877 7.33214 5.49877 8.00014 5.49877C8.66814 5.49877 9.29614 5.75877 9.76814 6.23077C10.2364 6.70002 10.4994 7.33586 10.4994 7.99877C10.4994 8.66169 10.2364 9.29752 9.76814 9.76677C9.29614 10.2388 8.66814 10.4988 8.00014 10.4988Z" fill="white" />
                </svg>
            </div>
            <div className="flex flex-col ">
                <span className="text-[13px] text-[#fff]/70 ">{t('new_footer.location.title')}</span>
                <span className="max-w-[237px] font-medium text-[12px] lg:text-[14px] text-[#fff]">{Footer?.find((item: any) => item?.key === 'business_address')?.value}</span>
            </div>
        </div>
    )
}
